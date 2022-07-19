import { startTransition, useEffect, useState } from 'react';
import { aggregatedEventStream$ } from '../dataStreams/serviceStreams';
import { Subject } from 'rxjs';

const COUNTS = [10, 15, 30, 60, 120];
const DEFAULT_COUNT = COUNTS[2];

const useEvents = (sort) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const updateState = (clusters) => {
      startTransition(() => {
        setEvents(sort ? clusters.sort(sort) : clusters);
      });
    };

    const countChange = new Subject();
    const observer = countChange
      .combineLatest(aggregatedEventStream$)
      .map(([amount, arr]) => arr.slice(0, amount))
      .subscribe(updateState);

    countChange.next(DEFAULT_COUNT);

    return () => {
      countChange.complete();
      observer.unsubscribe();
    };
  }, [sort]);

  return events;
};

export default useEvents;
