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
      removeListener: (channel: string, data: () => void) => void;
      db: {
        insertProfile: (profile: {
          resume: string;
          user_story: string;
          glossary: string;
        }) => Promise<void>;
        fetchProfile: (id: number) => Promise<{
          resume: string;
          user_story: string;
          glossary: string;
        }>;
      };
    };
  }
}
