const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const { MOUNTING_PATH } = require('../globalConfig');

const app = express();
const sub = express();
const env = process.env.NODE_ENV || 'development';
const rootPath = path.normalize(`${__dirname}/../build`);

let devCredentials;
if (env === 'development') {
  // eslint-disable-next-line global-require
  devCredentials = require('../devCredentials.json');
}

const AWS_REGION = process.env.AWS_REGION || devCredentials.AWS_REGION;
const AWS_ACCESS_KEY_ID =
  process.env.AWS_ACCESS_KEY_ID || devCredentials.DEVELOPMENT_AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY =
  process.env.AWS_SECRET_ACCESS_KEY ||
  devCredentials.DEVELOPMENT_AWS_SECRET_KEY;

const sts = new AWS.STS({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

sub.use(express.static(rootPath));

sub.post('/authenticate', (req, res) => {
  return sts
    .getSessionToken()
    .promise()
    .then((tokenResponse) => {
      res.json({
        aws_region: AWS_REGION,
        credentials: tokenResponse.Credentials,
      });
    });
});

sub.get('/ping', (req, res) => {
  res.contentType('text/plain');
  return res.send('PONG');
});

sub.get('*', (req, res) => {
  // send down the homepage from the build directory.
  res.sendFile('index.html', { root: rootPath });
});

app.use(MOUNTING_PATH, sub);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
