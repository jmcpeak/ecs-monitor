import { useEffect, useMemo, useState } from 'react';
import { scanServiceEventsForTaskChurn } from '../../../../consts';
import { useServices } from '../../../../hooks';

const initialOpenState = false;

const useTaskChurn = () => {
  const [dismissList, setDismissList] = useState([]);
  const [open, setOpen] = useState(initialOpenState);
  const [serviceName, setServiceName] = useState();
  const services = useServices('useTaskChurn');
  const churnEntries = scanServiceEventsForTaskChurn(services);

  useEffect(() => {
    churnEntries.every(({ isChurnDetected, serviceName: entryServiceName }) => {
      if (isChurnDetected) {
        setServiceName(entryServiceName);

        if (!dismissList.includes(entryServiceName)) {
          setOpen(true);
        }

        return false;
      }

      return true;
    });
  }, [churnEntries, dismissList]);

  return useMemo(() => {
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

    return { handleClose, handleDismiss, open, serviceName };
  }, [dismissList, open, serviceName]);
};

export default useTaskChurn;
