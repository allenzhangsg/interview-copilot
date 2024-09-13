// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  restoreWindow: () => ipcRenderer.send("restore-window"),
  send: (channel: string, data: () => void) => ipcRenderer.send(channel, data),
  on: (channel: string, data: () => void) => ipcRenderer.on(channel, data),
  removeListener: (channel: string, data: () => void) =>
    ipcRenderer.removeListener(channel, data),
  db: {
    insertProfile: (profile: {
      resume: string;
      user_story: string;
      glossary: string;
    }) => ipcRenderer.invoke("db:insertProfile", profile),
    fetchProfile: (
      id: number
    ): Promise<{ resume: string; user_story: string; glossary: string }> =>
      ipcRenderer.invoke("db:fetchProfile", id),
  },
});
