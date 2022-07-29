import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

var pkcs11js = require("pkcs11js");
var usbDetect = require('usb-detection');
var usbCertis = [];

const jwt = require("jsonwebtoken");

let folder = app.getPath("userData");
console.log(folder);

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

let opsys = process.platform;
let plataform : string = "";

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (opsys == "darwin") {
    plataform = "MacOS";
  } else if (opsys == "win32") {
    plataform = "Windows";
  } else if (opsys == "linux") {
    plataform = "Linux";
  }

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

  usbDetect.on('add', async function (device) {
    console.log('add', device);
    let certisLength = usbCertis.length;
    if ( device.manufacturer === "SafeNet" ||  device.manufacturer === "Giesecke___Devrient_GmbH" ||
      device.manufacturer === "Aladdin_Knowledge_Systems_Ltd." ) {
      await recoveryCerti(device);
    }

    if ( certisLength !== usbCertis.length ) {
      console.log("EMITTING EVENT USB CHANGE");
      console.log(usbCertis);
      win.webContents.send("usbcertischange", usbCertis);
    }
  });
  usbDetect.on('remove', function (device) {
    console.log('remove', device);

    let certisLength = usbCertis.length;
    if ( device.manufacturer === "SafeNet" ||  device.manufacturer === "Giesecke___Devrient_GmbH" ||
      device.manufacturer === "Aladdin_Knowledge_Systems_Ltd." ||  device.manufacturer === "Giesecke & Devrient GmbH" ) {
      removeCerti(device);
    }

    if ( certisLength !== usbCertis.length ) {
      console.log("EMITTING EVENT USB CHANGE");
      console.log(usbCertis);
      win.webContents.send("usbcertischange", usbCertis);
    }
  });
  usbDetect.find(async function (err, devices) {
    console.log('find', devices, err);

    for ( let device of devices ) {
      if ( device.manufacturer === "SafeNet" ||  device.manufacturer === "Giesecke & Devrient GmbH" ||
        device.manufacturer === "Aladdin_Knowledge_Systems_Ltd." ) {
        await recoveryCerti(device);
      }
    }

    if ( usbCertis.length > 0 ) {
      console.log("EMITTING EVENT USB CHANGE");
      console.log(usbCertis);
      win.webContents.send("usbcertischange", usbCertis);
    }
  });

  ipcMain.handle("teste", (event, data) => {
    //console.log(event);
    console.log(data);

    return "TESTE OK";
  });

  ipcMain.handle("validatetoken", async (event, token) => {
    let resp = await verifyJWT(token);

    return resp;
  });

  ipcMain.handle("listcertis", async (event) => {
    return usbCertis;
  });

  return win;
}

/**
 * Tentar recuperar os certificados em um dispositivo USB
 */
async function recoveryCerti(device) {
  let pkcs11 = new pkcs11js.PKCS11();

  device.deviceName = device.deviceName.replaceAll("&", " ").replaceAll(" ", "_");
  device.manufacturer = device.manufacturer.replaceAll("&", " ").replaceAll(" ", "_");

  let loadLib = false;
  try {
    // Verificar qual das bibliotecas deve carregar
    if ( device.deviceName.indexOf("StarSign_CUT") >= 0 ) {
      console.log("StarSign_CUT");
      switch ( plataform ) {
        case "MacOs":
          console.log("MACOS");
          break;
        case "Windows":
          console.log("WINDOWS");
          break;
        case "Linux":
          loadLib = true;
          pkcs11.load("/usr/lib/libaetpkss.so");
          //pkcs11.load("/usr/lib/kkkkk.so");
          break;
      }
    } else if ( device.deviceName.indexOf("Token_JC") >= 0 ) {
      console.log("Token_JC");
      switch ( plataform ) {
        case "MacOs":
          console.log("MACOS");
          break;
        case "Windows":
          console.log("WINDOWS");
          break;
        case "Linux":
          loadLib = true;
          pkcs11.load("/usr/lib/libeToken.so");
          break;
      }
    } else if ( device.deviceName.indexOf("Token_4.28.1.1_2.7.195") >= 0 ) {
      console.log("Token_4.28.1.1_2.7.195");
      switch ( plataform ) {
        case "MacOs":
          console.log("MACOS");
          break;
        case "Windows":
          console.log("WINDOWS");
          break;
        case "Linux":
          loadLib = true;
          pkcs11.load("/usr/lib/libaetpkss.so");
          break;
      }
    } else {
      console.log("NAO SUPORTADO");
      console.log(device.deviceName);
    }
  } catch ( e ) {
    console.log("--> Não foi possivel carregar a biblioteca <--");
    console.log(e);
    // Enviar evento para abrir popup e perdir a pessoa para ver se o token esta corretamente cadastrado
    return;
  }

  if ( !loadLib ) {
    console.log("--> Não foi possivel localizar a biblioteca para o token <--");
    // Enviar mensagem avisando que o token não e suportado
    return;
  }

  try {
    pkcs11.C_Initialize();

    // Getting list of slots
    let slots = pkcs11.C_GetSlotList(true);
    let totalLoops = 0;
    while ( slots.length === 0 && totalLoops < 4 ) {
      console.log("Aguardando um pouco para tentar novamente");
      await sleep(500);
      console.log("Tentando novamente");
      slots = pkcs11.C_GetSlotList(true);
      totalLoops++;
    }
    if ( slots.length === 0 ) {
      console.log("Não foi possível abri conexao com o token");
      return;
    }
    console.log(slots);
    let slot = slots[0];

    console.log("F");
    console.log(slot);

    let session = pkcs11.C_OpenSession(slot, pkcs11js.CKF_RW_SESSION | pkcs11js.CKF_SERIAL_SESSION);

    console.log("G");

    pkcs11.C_FindObjectsInit(session, [{type: pkcs11js.CKA_CLASS, value: pkcs11js.CKO_PUBLIC_KEY}]);
    let hObject = pkcs11.C_FindObjects(session);

    console.log("H");

    while (hObject) {
      let attrs = pkcs11.C_GetAttributeValue(session, hObject, [
        {type: pkcs11js.CKA_CLASS},
        {type: pkcs11js.CKA_TOKEN},
        {type: pkcs11js.CKA_LABEL},
      ]);
      // Output info for objects from token only
      if (attrs[1].value[0]) {
        let name = attrs[2].value.toString();
        if ( name.indexOf(":") > 0 ) {
          console.log("ACEITO");
          console.log(name);
          let info =
          usbCertis.push({
            nome: name.substring(0, name.indexOf(":")),
            doc: name.substring(name.indexOf(":") + 1, name.indexOf(":") + 1 + 11),
            emissor: name.substring(name.indexOf(":") + 15),
            device: device
          });
        } else {
          console.log("NEGADO");
          console.log(name);
        }
      }
      hObject = pkcs11.C_FindObjects(session);
    }

    console.log("M");

    pkcs11.C_FindObjectsFinal(session);
    pkcs11.C_CloseSession(session);
    pkcs11.C_Finalize();
    pkcs11 = null;

    console.log("N");
  } catch ( e ) {
    console.log("ERRO NA RECUPERACAO DOS CERTIFICADOS");
    console.log(e);
  }
}

function removeCerti(device) {
  let newUsbCertis = [];

  let achou = false;
  for ( let usbc of usbCertis ) {
    if ( usbc.device.deviceAddress !== device.deviceAddress
    ) {
      newUsbCertis.push(usbc);
    }
  }

  usbCertis = newUsbCertis;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
