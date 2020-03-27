const { app, Menu, MenuItem } = require('electron');
const electron = require("electron");
//const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file:///${path.join(__dirname, "../build/index.html")}`
    );

    if(!isDev){
        const menu = new Menu();
        // menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }));
        // menu.append(new MenuItem({ type: 'separator' }));
        // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
    
        Menu.setApplicationMenu(menu);
    }

    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});