import EcsTable from '../../../Table';
import TableRows from './TableRows';
import { useDeployments } from '../../../../../hooks';
import {
  defaultOrder,
  defaultOrderBy,
  defaultCompareFn,
  headCells,
} from './consts';

const Table = () => {
  const deployments = useDeployments();

  return (
    <EcsTable
      defaultCompareFn={defaultCompareFn}
      defaultOrder={defaultOrder}
      defaultOrderBy={defaultOrderBy}
      headCells={headCells}
      TableHeadDisabled={deployments.length === 0}
      TableRows={TableRows}
    />
  );
};

export default Table;
