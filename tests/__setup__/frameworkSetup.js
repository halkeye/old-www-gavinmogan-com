let isConsoleWarningOrError;
beforeEach(() => {
  isConsoleWarningOrError = false;
  const originalError = global.console.error;
  jest.spyOn(global.console, 'error').mockImplementation((...args) => {
    if (args.join('').includes('Please update the following components: SideEffect(NullComponent)')) {
      return;
    }
    isConsoleWarningOrError = true;
    originalError(...args);
  });
  const originalWarn = global.console.warn;
  jest.spyOn(global.console, 'warn').mockImplementation((...args) => {
    if (args.join('').includes('Please update the following components: SideEffect(NullComponent)')) {
      return;
    }
    isConsoleWarningOrError = true;
    originalWarn(...args);
  });
});

afterEach(() => {
  if (isConsoleWarningOrError) {
    throw new Error('Console warnings and errors are not allowed');
  }
});
