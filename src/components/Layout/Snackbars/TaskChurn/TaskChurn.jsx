import Snackbar from '@mui/material/Snackbar';
import TaskChurnAction from './TaskChurnAction';
import TaskChurnMessage from './TaskChurnMessage';
import useSnackbar from './useTaskChurn';

const TaskChurn = () => {
  const snackbar = useSnackbar();

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
