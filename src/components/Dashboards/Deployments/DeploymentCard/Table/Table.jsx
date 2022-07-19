import EcsTable from '../../../Table.jsx';
import TableRows from './TableRows.jsx';
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
