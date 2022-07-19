import { startTransition, useEffect, useState } from 'react';
import { formattedTimeStamp } from './utils';
import { servicesStream$ } from '../dataStreams/serviceStreams';
import { services as name } from '../consts.jsx';

const useServiceTitle = () => {
  const [count, setCount] = useState('Loading');
  const [lastUpdate, setLastUpdate] = useState('N/A');

  useEffect(() => {
    const updateState = (services) => {
      startTransition(() => {
        setCount(services?.length);
        setLastUpdate(formattedTimeStamp());
      });
    };

    const observer = servicesStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, []);

  return [`${count} ${name}`, lastUpdate];
};

export default useServiceTitle;
