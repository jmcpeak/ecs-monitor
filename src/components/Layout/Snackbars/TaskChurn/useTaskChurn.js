import { useEffect, useMemo, useState } from 'react';

const initialOpenState = false;
const initialDismissList = [];

const useTaskChurn = (churnEntries) => {
  const [dismissList, setDismissList] = useState(initialDismissList);
  const [open, setOpen] = useState(initialOpenState);
  const [serviceName, setServiceName] = useState();

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
