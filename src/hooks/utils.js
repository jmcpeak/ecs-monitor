import moment from 'moment/moment';

export const formattedTimeStamp = () => {
  return moment().format('dddd Do MMMM YYYY, h:mm:ss a');
};

export const handleStopPropagation = (event) => {
  if (event?.stopPropagation) {
    event.stopPropagation();
  }
};

export const stringToColor = (str) => {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;

    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};
