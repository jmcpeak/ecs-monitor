import { startTransition, useEffect, useState } from 'react';
import { aggregatedServiceDeploymentStream$ } from '../dataStreams/serviceStreams';

const desiredCount = 10;

const useDeployments = (compareFn) => {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const updateState = (latestDeployments) => {
      startTransition(() => {
        setDeployments(
          compareFn ? latestDeployments.sort(compareFn) : latestDeployments
        );
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
