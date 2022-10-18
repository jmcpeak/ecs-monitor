import { always } from 'ramda';
import { useEffect } from 'react';

/**
 * useEventListener - takes the hard work out of adding and removing listeners in React
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
 *
 * @param {(string|string[])} [eventTypeOrTypes=[]] - A case-sensitive string or strings representing the event type to listen for
 * @param {function} [listener=() => {}] - callback function - The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs
 * @param {Window|WebSocket} [targetElement=window] - Common targets are Element, Document, and Window, but the target may be any object that supports events (such as XMLHttpRequest).
 * @param options
 */
const useEventListener = (
  eventTypeOrTypes = [],
  listener = always,
  targetElement = window,
  options = null
) => {
  useEffect(() => {
    const eventTypes =
      typeof eventTypeOrTypes === 'string'
        ? [eventTypeOrTypes]
        : eventTypeOrTypes;

    if (targetElement?.addEventListener) {
      eventTypes.forEach((eventType) => {
        targetElement.addEventListener(eventType, listener, options);
      });
    }

    // This is an effect that requires cleanup when the component using this
    // custom hook unmounts:
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      // Check if the event listener we were given was a debounced or throttled
      // event listener, if it is, cancel any future events
      // https://github.com/niksy/throttle-debounce#cancelling
      if (listener?.cancel) {
        listener.cancel();
      }

      // Remove the event listeners
      if (targetElement?.removeEventListener) {
        eventTypes.forEach((eventType) => {
          targetElement.removeEventListener(eventType, listener, options);
        });
      }
    };
  }, [eventTypeOrTypes, listener, options, targetElement]);
};

export default useEventListener;
