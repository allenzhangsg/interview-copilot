import {
  app,
  BrowserWindow,
  ipcMain,
  desktopCapturer,
  session,
  // dialog,
} from "electron";
import {
  initDatabase,
  insertProfile,
  fetchProfile,
  getLastInsertedProfile,
  removeAllProfiles,
  insertCareer,
  getLastInsertedCareer,
  removeAllCareers,
} from "./backend/db";
import path from "path";
import fs from "fs/promises";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = async (): Promise<void> => {
  await initDatabase();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minHeight: 600,
    minWidth: 800,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    console.log("Display media requested");
    desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: "loopback" });
    });
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ipcMain.handle("db:insertProfile", async (event, profile) => {
    return await insertProfile(profile);
  });

  ipcMain.handle("db:fetchProfile", async (event, id) => {
    return await fetchProfile(id);
  });

  ipcMain.handle("db:getLastInsertedProfile", async () => {
    return await getLastInsertedProfile();
  });

  ipcMain.handle("db:removeAllProfiles", async () => {
    return await removeAllProfiles();
  });

  ipcMain.handle("db:insertCareer", async (event, career) => {
    return await insertCareer(career);
  });

  ipcMain.handle("db:getLastInsertedCareer", async () => {
    return await getLastInsertedCareer();
  });

  ipcMain.handle("db:removeAllCareers", async () => {
    return await removeAllCareers();
  });

  ipcMain.on("save-audio", async (event, { buffer, type }) => {
    // const { filePath } = await dialog.showSaveDialog({
    //   title: "Save Audio File",
    //   defaultPath: path.join(
    //     app.getPath("documents"),
    //     `${type}-recording.webm`
    //   ),
    //   filters: [{ name: "WebM Audio", extensions: ["webm"] }],
    // });

    const fileName = `${type}_recording_${Date.now()}.webm`;
    const filePath = `recordings/${fileName}`;
    const fullPath = path.join(__dirname, "../..", filePath);

    if (fullPath) {
      console.log("Saving audio file to:", fullPath);
      const audioBuffer = Buffer.from(buffer);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, audioBuffer);
      // fs.writeFile(filePath, audioBuffer, (err) => {
      //   if (err) {
      //     console.error("Failed to save audio file:", err);
      //   } else {
      //     console.log("Audio file saved successfully");
      //   }
      // });
    }
  });

  ipcMain.on("close-window", () => {
    mainWindow.close();
  });
  ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
  });
  ipcMain.on("maximize-window", () => {
    mainWindow.maximize();
  });

  ipcMain.on("restore-window", () => mainWindow.unmaximize());

  mainWindow.on("maximize", () =>
    mainWindow.webContents.send("window-maximized")
  );
  mainWindow.on("unmaximize", () =>
    mainWindow.webContents.send("window-restored")
  );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
