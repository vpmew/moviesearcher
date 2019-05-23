const throttle = (f, ms) => {
  let isThrottled = false;
  let lastAction = false;
  let lastEvent;

  const wrapper = event => {
    if (isThrottled) {
      lastAction = true;
      lastEvent = event;
      return;
    }
    f(event);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (lastAction) {
        f(lastEvent);
      }
      lastAction = false;
    }, ms);
  };

  return wrapper;
};

export default throttle;
