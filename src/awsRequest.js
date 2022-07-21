import config from './config';

function handleCreateResult(fn) {
  return function getConfig(awsConfig) {
    this.setConfig(awsConfig);
    return fn(awsConfig);
  };
}

const awsRequest = {
  // eslint-disable-next-line no-void
  awsConfig: void 0,
  setConfig(awsConfig) {
    this.awsConfig = awsConfig;
  },
  create(fn) {
    if (this.awsConfig) {
      return fn(this.awsConfig);
    }
    return config.getAwsConfig().then(handleCreateResult(fn).bind(awsRequest));
  },
};

export default awsRequest;
