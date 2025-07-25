//#region @notForNpm
import { app, BrowserWindow, screen } from 'electron';
import { path, fse } from 'tnp-core/src';

import start from './app';
import { FRONTEND_HOST_URL_ELECTRON } from './app.hosts';
import { ENV_ELECTRON_APP_BUILD_ANGULAR_PROD } from './lib/env';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    autoHideMenuBar: true,
    width: size.width * (3 / 4),
    height: size.height * (3 / 4),
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();
    win.webContents.openDevTools();

    // require('electron-reloader')(module); // this hangs frontend randomly
    win.loadURL(FRONTEND_HOST_URL_ELECTRON);
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fse.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);

    if (!ENV_ELECTRON_APP_BUILD_ANGULAR_PROD) {
      // Open the DevTools.
      win.webContents.openDevTools();
    }
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

async function startElectron() {
  await start();
  try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    // app.on('ready', () => setTimeout(createWindow, 400));
    setTimeout(createWindow, 400);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow();
      }
    });
  } catch (e) {
    // Catch Error
    throw e;
  }
}

startElectron();
//#endregion
