import EcsTable from '../../../Table';
import TableRows from './TableRows';
import { useEvents } from '../../../../../hooks';
import {
  defaultOrder,
  defaultOrderBy,
  defaultCompareFn,
  headCells,
} from './consts';

const Table = (props) => {
  const events = useEvents();

  return (
    <EcsTable
      {...props}
      defaultCompareFn={defaultCompareFn}
      defaultOrder={defaultOrder}
      defaultOrderBy={defaultOrderBy}
      headCells={headCells}
      TableHeadDisabled={events.length === 0}
      TableRows={TableRows}
    />
  );
};

export default Table;
