export const DESC = 'desc';

export const dateCompareFn = (order, orderBy) => {
  return order === DESC
    ? (a, b) => new Date(a[orderBy]) - new Date(b[orderBy])
    : (a, b) => new Date(b[orderBy]) - new Date(a[orderBy]);
};
