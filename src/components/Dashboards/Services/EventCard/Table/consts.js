import { DESC, numberCompareFn } from '../../../consts';

export const defaultOrder = DESC;
export const defaultOrderBy = 'createdAt';
export const headCells = [
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Created At',
  },
  {
    id: 'message',
    numeric: false,
    disablePadding: true,
    label: 'message',
  },
];

export const defaultCompareFn = () => {
  return numberCompareFn(defaultOrder, defaultOrderBy);
};
