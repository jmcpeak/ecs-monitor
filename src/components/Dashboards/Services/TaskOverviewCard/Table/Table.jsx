import { useOutletContext } from 'react-router-dom';
import EcsTable from '../../../Table';
import TableRows from './TableRows';
import {
  defaultOrder,
  defaultOrderBy,
  defaultCompareFn,
  headCells,
} from './consts';

const Table = (props) => {
  const { servicesDisabled } = useOutletContext();

  return (
    <EcsTable
      {...props}
      defaultCompareFn={defaultCompareFn}
      defaultOrder={defaultOrder}
      defaultOrderBy={defaultOrderBy}
      headCells={headCells}
      TableHeadDisabled={servicesDisabled}
      TableRows={TableRows}
    />
  );
};

export default Table;
