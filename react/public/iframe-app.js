window.onerror = function (message, source, lineno, colno, error) {
  console.error('Глобальная ошибка в iframe:', {
    message,
    source,
    lineno,
    colno,
    error,
    stack: error?.stack
  });
  window.parent.postMessage({
    type: 'error',
    message: message,
    stack: error?.stack,
    source,
    lineno,
    colno
  }, '*');
  return true; // Предотвращаем стандартный вывод ошибки в консоль
};

window.addEventListener('unhandledrejection', event => {
  console.error('Необработанная ошибка промиса в iframe:', {
    reason: event.reason,
    message: event.reason?.message,
    stack: event.reason?.stack
  });
  window.parent.postMessage({
    type: 'promiseError',
    message: event.reason?.message,
    stack: event.reason?.stack
  }, '*');
  event.preventDefault();
});
