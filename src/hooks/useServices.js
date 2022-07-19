import { startTransition, useEffect, useState } from 'react';
import { servicesStream$ } from '../dataStreams/serviceStreams';

const useServices = (compareFn) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const updateState = (services) => {
      startTransition(() => {
        setServices(compareFn ? services.sort(compareFn) : services);
      });
    };

    const observer = servicesStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, [compareFn]);

  return services;
};

export default useServices;
