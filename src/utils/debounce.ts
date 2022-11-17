function debounce(func: any, wait?: number, immediate?: string) {
  let timeout: any;

  return function executedFunction(this: any) {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export default debounce;
