import { startTransition, useEffect, useState } from 'react';
import { aggregatedServiceDeploymentStream$ } from '../dataStreams/serviceStreams';

const desiredCount = 10;

const useDeployments = (compareFn) => {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const updateState = (deployments) => {
      startTransition(() => {
        setDeployments(compareFn ? deployments.sort(compareFn) : deployments);
      });
    };

    const stream = aggregatedServiceDeploymentStream$(desiredCount);
    const observer = stream.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, [compareFn]);

  return deployments;
};

export default useDeployments;
