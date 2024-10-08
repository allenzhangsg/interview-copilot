export {};

declare global {
  interface Window {
    electron: {
      closeWindow: () => void;
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      restoreWindow: () => void;
      on: (channel: string, data: () => void) => void;
      send: (channel: string, data: (() => void) | object) => void;
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
        insertCareer: (career: {
          company_name: string;
          job_description: string;
        }) => Promise<number>;
        getLastInsertedCareer: () => Promise<{
          id: number;
          company_name: string;
          job_description: string;
          last_edited: string;
        }>;
        removeAllCareers: () => Promise<void>;
      };
    };
  }
}
