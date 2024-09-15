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
        }) => Promise<number>;
        fetchProfile: (id: number) => Promise<{
          resume: string;
          user_story: string;
          glossary: string;
          last_edited: string;
        }>;
        getLastInsertedProfile: () => Promise<{
          resume: string;
          user_story: string;
          glossary: string;
          last_edited: string;
        }>;
        removeAllProfiles: () => Promise<void>;
      };
    };
  }
}
