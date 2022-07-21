import logger from '../utils/logger';

// eslint-disable-next-line import/prefer-default-export
export function streamRetryFn(delay) {
  return (errors$) => {
    errors$.subscribe(logger.logToConsole);
    return errors$.delay(delay);
  };
}
