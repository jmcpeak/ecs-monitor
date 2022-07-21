// eslint-disable-next-line import/prefer-default-export
export function nameFromAwsArn(arn) {
  const lastIndexOfSlash = arn.lastIndexOf('/');
  return arn.substring(lastIndexOfSlash + 1);
}
