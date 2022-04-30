export function debounce(fn: (...arg: any[]) => void, delay = 300) {
    let timer: any = null;
    return (...arg: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...arg);
        clearTimeout(timer);
      }, delay);
    };
  }
  
  
