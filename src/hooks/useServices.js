import { startTransition, useEffect, useState } from 'react';
import { servicesStream$ } from '../dataStreams/serviceStreams';

const initialState = [];

const useServices = (name = 'unknown', compareFn = null) => {
  const [services, setServices] = useState(initialState);

  useEffect(() => {
    const updateState = (latestServices) => {
      startTransition(() => {
        setServices(
          compareFn ? latestServices.sort(compareFn) : latestServices
        );
      });
    };

    const observer = servicesStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, [compareFn, name]);

  return services;
};

export default useServices;
