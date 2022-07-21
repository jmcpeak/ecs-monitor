import EcsTable from '../../../Table';
import TableRows from './TableRows';
import { useServices } from '../../../../../hooks';
import {
  defaultOrder,
  defaultOrderBy,
  defaultCompareFn,
  headCells,
} from './consts';

const Table = (props) => {
  const services = useServices('Table');

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
