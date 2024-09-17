import { createContext } from "react";

interface NotificationContextType {
  setNotification: (message: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
