export function debounce(func, delay = 1000) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, delay);
  };
}
