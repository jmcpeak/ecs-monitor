import { startTransition, useEffect, useState } from 'react';
import { formattedTimeStamp } from './utils';
import { aggregatedServiceDeploymentStream$ } from '../dataStreams/serviceStreams';
import { deployments as name } from '../consts.jsx';

const desiredCount = 10;

const useDeploymentTitle = () => {
  const [count, setCount] = useState('Loading');
  const [lastUpdate, setLastUpdate] = useState('N/A');

  useEffect(() => {
    const updateState = (deployments) => {
      startTransition(() => {
        setCount(deployments?.length);
        setLastUpdate(formattedTimeStamp());
      });
    };

    const stream = aggregatedServiceDeploymentStream$(desiredCount);
    const observer = stream.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, []);

  return [`${count} ${name}`, lastUpdate];
};

export default useDeploymentTitle;
