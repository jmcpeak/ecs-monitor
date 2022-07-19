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
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;

    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};
