import { DESC, numberCompareFn } from '../../../consts';

export const defaultOrder = DESC;
export const defaultOrderBy = 'runningCount';
export const headCells = [
  {
    id: 'serviceName',
    numeric: false,
    disablePadding: true,
    label: 'Service Name',
  },
  {
    id: 'desiredCount',
    numeric: true,
    disablePadding: false,
    label: 'Desired',
  },
  {
    id: 'runningCount',
    numeric: true,
    disablePadding: false,
    label: 'Running',
  },
  {
    id: 'cpu',
    numeric: true,
    disablePadding: false,
    label: 'CPU',
  },
  {
    id: 'mem',
    numeric: true,
    disablePadding: false,
    label: 'Mem(res)',
  },
];

export const defaultCompareFn = () => {
  return numberCompareFn(defaultOrder, defaultOrderBy);
};
