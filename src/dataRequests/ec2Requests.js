import AWS from 'aws-sdk';
import awsRequest from '../awsRequest';

const describeEc2Instance = (instanceId) => {
  return function getConfig(awsConfig) {
    const ec2 = new AWS.EC2(awsConfig);
    return ec2
      .describeInstances({
        InstanceIds: [instanceId],
      })
      .promise()
      .then((response) => response.Reservations[0].Instances[0]); // remove the noise, give us the instance data.
  };
};

// eslint-disable-next-line import/prefer-default-export
export const getEc2InstanceDetails = (instanceId) => {
  const detailsReq = describeEc2Instance(instanceId);
  return awsRequest.create(detailsReq);
};
