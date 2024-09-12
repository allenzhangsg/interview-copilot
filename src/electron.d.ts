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
          resumeText: string;
          userStoryText: string;
          glossaryText: string;
        }) => Promise<void>;
        fetchProfile: (id: number) => Promise<{
          resumeText: string;
          userStoryText: string;
          glossaryText: string;
        }>;
      };
    };
  }
}
