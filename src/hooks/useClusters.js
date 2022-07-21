import { startTransition, useEffect, useState } from 'react';
import { clusterStream$ } from '../dataStreams/clusterStreams';

const useClusters = (sort) => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const updateState = (latestClusters) => {
      startTransition(() => {
        setClusters(sort ? latestClusters.sort(sort) : latestClusters);
      });
    };

    const observer = clusterStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, [sort]);

  return clusters;
};

export default useClusters;
