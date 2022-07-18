import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

var usbDetect = require('usb-detection');
const jwt = require("jsonwebtoken");

let folder = app.getPath("userData");
console.log(folder);

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    icon: './src/256x256.png',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  usbDetect.startMonitoring();

  usbDetect.on('add', function (device) {
    console.log('add', device);
  });
  usbDetect.on('remove', function (device) {
    console.log('remove', device);
  });
  usbDetect.find(function (err, devices) {
    console.log('find', devices, err);
  });

  ipcMain.handle("teste", (event, data) => {
    //console.log(event);
    console.log(data);

    return "TESTE OK";
  });

  ipcMain.handle("validatetoken", async (event, token) => {
    //console.log(event);
    console.log(token);
    let resp = await verifyJWT(token);

    console.log(resp);

    return resp;
  });

  return win;
}

/**
 * Verifica a validade do token retornando a informacao guardado no mesmo
 *
 * @param {String} token
 */
async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    var parts = token.split('.');

    if (parts.length !== 3) {
      return resolve(
        {iat: 0, exp: 0}
      );
    }

    let cert = fs.readFileSync('./app/key/public.pem');

    try {
      jwt.verify(token, cert, {algorithms: ['RS256']}, (err, decoded) => {
        if (err) {
          this.logger.warn("Erro na verificacao do JWT:", err);
          return resolve(
            {iat: 0, exp: 0}
          );
        }

        resolve(decoded);
      });
    } catch (e) {
      return resolve(
        {iat: 0, exp: 0}
      );
    }
  });
}


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    usbDetect.stopMonitoring();
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
  // throw e;
}
