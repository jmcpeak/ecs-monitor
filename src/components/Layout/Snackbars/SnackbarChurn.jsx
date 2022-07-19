import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { scanServiceEventsForTaskChurn } from '../../../consts.jsx';
import { useServices } from '../../../hooks';

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};
// const autoHideDuration = 6000;

const SnackbarChurn = () => {
  const [dismissList, setDismissList] = useState([]);
  const [open, setOpen] = useState(false);
  const [serviceName, setServiceName] = useState();
  const services = useServices();

  const message = `Task churn spotted on ${serviceName}`;

  const handleClose = () => {
    setOpen(false);
  };
  const handleDismiss = () => {
    handleClose();

    if (!dismissList.includes(serviceName)) {
      dismissList.push(serviceName);
      setDismissList(dismissList);
    }
  };

  useEffect(() => {
    const churnEntries = scanServiceEventsForTaskChurn(services);

    churnEntries.every(({ isChurnDetected, serviceName }) => {
      if (isChurnDetected) {
        setServiceName(serviceName);

        if (!dismissList.includes(serviceName)) {
          setOpen(true);
        }

        return false;
      }

      return true;
    });
  }, [services, dismissList]);

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={handleClose}
      message={message}
      action={
        <Button color="primary" size="small" onClick={handleDismiss}>
          Dismiss
        </Button>
      }
    />
  );
};

export default SnackbarChurn;
