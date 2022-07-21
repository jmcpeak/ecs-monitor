import AWS from 'aws-sdk';
import awsRequest from '../awsRequest';
import { currentLogGroup } from '../utils/localStorage';

function describeLogStreamsRequest(prefix, nextToken) {
  const orderBy = prefix ? 'LogStreamName' : 'LastEventTime';

  // http://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeLogStreams.html
  return function getConfig(awsConfig) {
    const cwLogs = new AWS.CloudWatchLogs(awsConfig);
    return cwLogs
      .describeLogStreams({
        logGroupName: currentLogGroup(),
        nextToken,
        logStreamNamePrefix: prefix,
        orderBy,
        descending: true,
      })
      .promise();
  };
}

function getLogEventsByName(logStreamName, nextToken) {
  // http://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_GetLogEvents.html
  return function getConfig(awsConfig) {
    const cwLogs = new AWS.CloudWatchLogs(awsConfig);
    return cwLogs
      .getLogEvents({
        logGroupName: currentLogGroup(),
        logStreamName,
        startFromHead: true,
        nextToken,
      })
      .promise();
  };
}

export function getLogs(prefix) {
  const reqFn = describeLogStreamsRequest(prefix);
  return awsRequest.create(reqFn);
}

export function getLogEvents(logStreamName) {
  const reqFn = getLogEventsByName(logStreamName);
  return awsRequest.create(reqFn);
}
