import { DESC, dateCompareFn } from '../../../consts';

export const defaultOrder = DESC;
export const defaultOrderBy = 'createdAt';
export const headCells = [
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'When',
  },
  {
    id: 'desiredCount',
    numeric: true,
    disablePadding: false,
    label: 'Desired',
  },
  {
    id: 'pendingCount',
    numeric: true,
    disablePadding: false,
    label: 'Pending',
  },
  {
    id: 'taskDefinition',
    numeric: false,
    disablePadding: false,
    label: 'Task Definition',
  },
];

export const defaultCompareFn = () => {
  return dateCompareFn(defaultOrder, defaultOrderBy);
};
