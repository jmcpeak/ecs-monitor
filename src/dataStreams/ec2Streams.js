import AWS from 'aws-sdk';
import { Observable, ReplaySubject } from 'rxjs';
import config from '../config';
import awsRequest from '../awsRequest';
import { streamRetryFn } from './common';

// eslint-disable-next-line no-underscore-dangle
const _containerInstancesStreamCache = {};

function getContainerInstanceArns(cluster) {
  const params = {
    cluster,
  };
  return awsRequest.create((awsConfig) => {
    const ecs = new AWS.ECS(awsConfig);
    return ecs.listContainerInstances(params).promise();
  });
}

function getContainerInstanceDetails(cluster, instances) {
  const params = {
    cluster,
    containerInstances: instances,
  };
  return awsRequest.create((awsConfig) => {
    const ecs = new AWS.ECS(awsConfig);
    return ecs.describeContainerInstances(params).promise();
  });
}

// STREAMS ===============

// eslint-disable-next-line import/prefer-default-export
export function containerInstancesStream(cluster) {
  const cacheKey = `containerInstancesStream::${cluster}`;
  if (_containerInstancesStreamCache[cacheKey]) {
    return _containerInstancesStreamCache[cacheKey];
  }

  const obs$ = Observable.timer(
    0,
    config.CONTAINER_INSTANCES_REFRESH_INTERVAL * 1000
  ) // timer in seconds
    .flatMap(() => {
      const containerInstances = getContainerInstanceArns(cluster);
      return containerInstances.then(({ containerInstanceArns }) =>
        getContainerInstanceDetails(cluster, containerInstanceArns)
      );
    })
    .pluck('containerInstances')
    .retryWhen(streamRetryFn(3000))
    .multicast(() => new ReplaySubject(1))
    .refCount();

  _containerInstancesStreamCache[cacheKey] = obs$;

  return obs$;
}
