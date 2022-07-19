import EcsTable from '../../../Table.jsx';
import TableRows from './TableRows.jsx';
import { useServices } from '../../../../../hooks';
import {
  defaultOrder,
  defaultOrderBy,
  defaultCompareFn,
  headCells,
} from './consts';

const Table = (props) => {
  const services = useServices();

  return (
    <EcsTable
      {...props}
      defaultCompareFn={defaultCompareFn}
      defaultOrder={defaultOrder}
      defaultOrderBy={defaultOrderBy}
      headCells={headCells}
      TableHeadDisabled={services.length === 0}
      TableRows={TableRows}
    />
  );
};

export default Table;
