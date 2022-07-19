import { useEffect } from 'react';
import { stringToColor } from './utils';
import { taskDefinitionStream$ } from '../dataStreams/taskDefinitionStreams';

// Example arn:aws:ecs:us-east-1:753224138664:task-definition/demo:1: "#655beb"
const colorCache = {};

const useTaskDefinitions = () => {
  useEffect(() => {
    const updateState = (arns) => {
      for (let i = 0; i < arns.length; i++) {
        const arn = arns[i];

        if (colorCache[arn]) {
          continue;
        }

        colorCache[arn] = stringToColor(arn);
      }

      return colorCache;
    };

    const observer = taskDefinitionStream$.subscribe(updateState);

    return () => {
      observer.unsubscribe();
    };
  }, []);

  return colorCache;
};

export default useTaskDefinitions;
