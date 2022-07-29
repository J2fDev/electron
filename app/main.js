"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
var url = require("url");
var pkcs11js = require("pkcs11js");
var usbDetect = require('usb-detection');
var usbCertis = [];
var jwt = require("jsonwebtoken");
var folder = electron_1.app.getPath("userData");
console.log(folder);
var win = null;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
var opsys = process.platform;
var plataform = "";
function createWindow() {
    var _this = this;
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    if (opsys == "darwin") {
        plataform = "MacOS";
    }
    else if (opsys == "win32") {
        plataform = "Windows";
    }
    else if (opsys == "linux") {
        plataform = "Linux";
    }
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        icon: './src/256x256.png',
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false, // false if you want to run e2e test with Spectron
        },
    });
    if (serve) {
        var debug = require('electron-debug');
        debug();
        require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');
    }
    else {
        // Path when running electron executable
        var pathIndex = './index.html';
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
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    usbDetect.startMonitoring();
    usbDetect.on('add', function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var certisLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('add', device);
                        certisLength = usbCertis.length;
                        if (!(device.manufacturer === "SafeNet" || device.manufacturer === "Giesecke___Devrient_GmbH" ||
                            device.manufacturer === "Aladdin_Knowledge_Systems_Ltd.")) return [3 /*break*/, 2];
                        return [4 /*yield*/, recoveryCerti(device)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (certisLength !== usbCertis.length) {
                            console.log("EMITTING EVENT USB CHANGE");
                            console.log(usbCertis);
                            win.webContents.send("usbcertischange", usbCertis);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    usbDetect.on('remove', function (device) {
        console.log('remove', device);
        var certisLength = usbCertis.length;
        if (device.manufacturer === "SafeNet" || device.manufacturer === "Giesecke___Devrient_GmbH" ||
            device.manufacturer === "Aladdin_Knowledge_Systems_Ltd." || device.manufacturer === "Giesecke & Devrient GmbH") {
            removeCerti(device);
        }
        if (certisLength !== usbCertis.length) {
            console.log("EMITTING EVENT USB CHANGE");
            console.log(usbCertis);
            win.webContents.send("usbcertischange", usbCertis);
        }
    });
    usbDetect.find(function (err, devices) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, devices_1, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('find', devices, err);
                        _i = 0, devices_1 = devices;
                        _a.label = 1;
                    case 1:
                        if (!(_i < devices_1.length)) return [3 /*break*/, 4];
                        device = devices_1[_i];
                        if (!(device.manufacturer === "SafeNet" || device.manufacturer === "Giesecke & Devrient GmbH" ||
                            device.manufacturer === "Aladdin_Knowledge_Systems_Ltd.")) return [3 /*break*/, 3];
                        return [4 /*yield*/, recoveryCerti(device)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (usbCertis.length > 0) {
                            console.log("EMITTING EVENT USB CHANGE");
                            console.log(usbCertis);
                            win.webContents.send("usbcertischange", usbCertis);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    electron_1.ipcMain.handle("teste", function (event, data) {
        //console.log(event);
        console.log(data);
        return "TESTE OK";
    });
    electron_1.ipcMain.handle("validatetoken", function (event, token) { return __awaiter(_this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyJWT(token)];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); });
    electron_1.ipcMain.handle("listcertis", function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, usbCertis];
        });
    }); });
    return win;
}
/**
 * Tentar recuperar os certificados em um dispositivo USB
 */
function recoveryCerti(device) {
    return __awaiter(this, void 0, void 0, function () {
        var pkcs11, loadLib, slots, totalLoops, slot, session, hObject, attrs, name_1, info, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pkcs11 = new pkcs11js.PKCS11();
                    device.deviceName = device.deviceName.replaceAll("&", " ").replaceAll(" ", "_");
                    device.manufacturer = device.manufacturer.replaceAll("&", " ").replaceAll(" ", "_");
                    loadLib = false;
                    try {
                        // Verificar qual das bibliotecas deve carregar
                        if (device.deviceName.indexOf("StarSign_CUT") >= 0) {
                            console.log("StarSign_CUT");
                            switch (plataform) {
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
                        }
                        else if (device.deviceName.indexOf("Token_JC") >= 0) {
                            console.log("Token_JC");
                            switch (plataform) {
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
                        }
                        else if (device.deviceName.indexOf("Token_4.28.1.1_2.7.195") >= 0) {
                            console.log("Token_4.28.1.1_2.7.195");
                            switch (plataform) {
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
                        }
                        else {
                            console.log("NAO SUPORTADO");
                            console.log(device.deviceName);
                        }
                    }
                    catch (e) {
                        console.log("--> Não foi possivel carregar a biblioteca <--");
                        console.log(e);
                        // Enviar evento para abrir popup e perdir a pessoa para ver se o token esta corretamente cadastrado
                        return [2 /*return*/];
                    }
                    if (!loadLib) {
                        console.log("--> Não foi possivel localizar a biblioteca para o token <--");
                        // Enviar mensagem avisando que o token não e suportado
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    pkcs11.C_Initialize();
                    slots = pkcs11.C_GetSlotList(true);
                    totalLoops = 0;
                    _a.label = 2;
                case 2:
                    if (!(slots.length === 0 && totalLoops < 4)) return [3 /*break*/, 4];
                    console.log("Aguardando um pouco para tentar novamente");
                    return [4 /*yield*/, sleep(500)];
                case 3:
                    _a.sent();
                    console.log("Tentando novamente");
                    slots = pkcs11.C_GetSlotList(true);
                    totalLoops++;
                    return [3 /*break*/, 2];
                case 4:
                    if (slots.length === 0) {
                        console.log("Não foi possível abri conexao com o token");
                        return [2 /*return*/];
                    }
                    console.log(slots);
                    slot = slots[0];
                    console.log("F");
                    console.log(slot);
                    session = pkcs11.C_OpenSession(slot, pkcs11js.CKF_RW_SESSION | pkcs11js.CKF_SERIAL_SESSION);
                    console.log("G");
                    pkcs11.C_FindObjectsInit(session, [{ type: pkcs11js.CKA_CLASS, value: pkcs11js.CKO_PUBLIC_KEY }]);
                    hObject = pkcs11.C_FindObjects(session);
                    console.log("H");
                    while (hObject) {
                        attrs = pkcs11.C_GetAttributeValue(session, hObject, [
                            { type: pkcs11js.CKA_CLASS },
                            { type: pkcs11js.CKA_TOKEN },
                            { type: pkcs11js.CKA_LABEL },
                        ]);
                        // Output info for objects from token only
                        if (attrs[1].value[0]) {
                            name_1 = attrs[2].value.toString();
                            if (name_1.indexOf(":") > 0) {
                                console.log("ACEITO");
                                console.log(name_1);
                                info = usbCertis.push({
                                    nome: name_1.substring(0, name_1.indexOf(":")),
                                    doc: name_1.substring(name_1.indexOf(":") + 1, name_1.indexOf(":") + 1 + 11),
                                    emissor: name_1.substring(name_1.indexOf(":") + 15),
                                    device: device
                                });
                            }
                            else {
                                console.log("NEGADO");
                                console.log(name_1);
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
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log("ERRO NA RECUPERACAO DOS CERTIFICADOS");
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function removeCerti(device) {
    var newUsbCertis = [];
    var achou = false;
    for (var _i = 0, usbCertis_1 = usbCertis; _i < usbCertis_1.length; _i++) {
        var usbc = usbCertis_1[_i];
        if (usbc.device.deviceAddress !== device.deviceAddress) {
            newUsbCertis.push(usbc);
        }
    }
    usbCertis = newUsbCertis;
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
/**
 * Verifica a validade do token retornando a informacao guardado no mesmo
 *
 * @param {String} token
 */
function verifyJWT(token) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var parts = token.split('.');
                    if (parts.length !== 3) {
                        return resolve({ iat: 0, exp: 0 });
                    }
                    var cert = fs.readFileSync('./app/key/public.pem');
                    try {
                        jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
                            if (err) {
                                _this.logger.warn("Erro na verificacao do JWT:", err);
                                return resolve({ iat: 0, exp: 0 });
                            }
                            resolve(decoded);
                        });
                    }
                    catch (e) {
                        return resolve({ iat: 0, exp: 0 });
                    }
                })];
        });
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    electron_1.app.on('ready', function () { return setTimeout(createWindow, 400); });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        usbDetect.stopMonitoring();
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map