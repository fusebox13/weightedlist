import { app, Menu, Tray, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow (event) {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: "Impact Calculator",
    resizable: false,
    height: 563,
    useContentSize: true,
    width: 400
  })

  tray = new Tray(__static + '/fcs.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'normal', click: function() {
      mainWindow.webContents.send('pong', Math.random())
    }},
    { label: 'Item2', type: 'normal' },
    { label: 'Item3', type: 'normal', checked: true },
    { label: 'Item4', type: 'normal' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
