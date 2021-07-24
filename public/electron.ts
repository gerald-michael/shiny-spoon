const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.ts')
        }
    })
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    )

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// ipc
ipcMain.on("getFile", function (event, data) {
    dialog.showOpenDialog({
        title: "Choose file",
        properties: ['openFile'],
        filters: data
    }).then(result => {
        event.returnValue = result;
    })
})

ipcMain.on("saveFile", function (event, data) {
    let result = dialog.showSaveDialogSync({
        title: "Save File",
        filters: data,
        properties: ["createDirectory", "showOverwriteConfirmation"]
    })
    event.returnValue = result
})