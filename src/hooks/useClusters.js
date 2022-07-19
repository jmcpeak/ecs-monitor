import { startTransition, useEffect, useState } from 'react';
import { clusterStream$ } from '../dataStreams/clusterStreams';

const useClusters = (sort) => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const updateState = (clusters) => {
      startTransition(() => {
        setClusters(sort ? clusters.sort(sort) : clusters);
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
