import Snackbar from '@mui/material/Snackbar';
import TaskChurnAction from './TaskChurnAction';
import TaskChurnMessage from './TaskChurnMessage';
import useSnackbar from './useTaskChurn';

// eslint-disable-next-line react/prop-types
const TaskChurn = ({ churnEntries, services }) => {
  const snackbar = useSnackbar(churnEntries, services);

  return (
    <Snackbar
      action={<TaskChurnAction onClick={snackbar.handleDismiss} />}
      message={<TaskChurnMessage serviceName={snackbar.serviceName} />}
      onClose={snackbar.handleClose}
      open={snackbar.open}
    />
  );
};

export default TaskChurn;
