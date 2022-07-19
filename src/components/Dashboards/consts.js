const comparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

export const ASC = 'asc';
export const DESC = 'desc';

export const accordionSX = {
  marginTop: 2,
  '&.Mui-expanded:first-of-type': {
    marginTop: 2,
  },
};
export const busySX = {
  margin: 2,
};
export const cardSX = {
  marginTop: 2,
};
export const cardContentSX = {
  '&.MuiCardContent-root': {
    paddingBottom: 2,
    paddingTop: 0,
    paddingLeft: 2,
    paddingRight: 2,
  },
};
export const titleTypographyProps = {
  variant: 'h6',
};

export const dateCompareFn = (order, orderBy) => {
  return order === DESC
    ? (a, b) => new Date(a[orderBy]) - new Date(b[orderBy])
    : (a, b) => new Date(b[orderBy]) - new Date(a[orderBy]);
};

export const numberCompareFn = (order, orderBy) => {
  return order === DESC
    ? (a, b) => comparator(a, b, orderBy)
    : (a, b) => -comparator(a, b, orderBy);
};

export const stringCompareFn = (order, orderBy) => {
  return (a, b) => {
    return order === DESC
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  };
};
