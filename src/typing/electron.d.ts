export {};

declare global {
  interface Window {
    electron: {
      closeWindow: () => void;
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      restoreWindow: () => void;
      on: (channel: string, data: () => void) => void;
      send: (channel: string, data: () => void) => void;
      removeAllListeners: (channel: string) => void;
    };
  }
}