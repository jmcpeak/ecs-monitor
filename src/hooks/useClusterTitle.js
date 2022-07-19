import { startTransition, useEffect, useState } from 'react';
import { formattedTimeStamp } from './utils';
import { clusterStream$ } from '../dataStreams/clusterStreams';
import { clusters as name } from '../consts.jsx';

const useClusterTitle = () => {
  const [count, setCount] = useState('Loading');
  const [lastUpdate, setLastUpdate] = useState('N/A');

  useEffect(() => {
    const updateState = (clusters) => {
      startTransition(() => {
        setCount(clusters?.length);
        setLastUpdate(formattedTimeStamp());
      });
    };

    const observer = clusterStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, []);

  return [`${count} ${name}`, lastUpdate];
};

export default useClusterTitle;
