const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            webSecurity: false
        }
    });

    win.webContents.openDevTools();
    win.maximize();
    win.loadFile('index.html');
}

app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.whenReady().then(() => {
    createWindow();
})
