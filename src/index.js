// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron'); // Import ipcMain module
const { autoUpdater } = require('electron-updater');
const path = require('node:path');

let mainWindow;

if(process.defaultApp){
  if(process.argv.length >= 2){
    app.setAsDefaultProtocolClient('station-monitor',process.execPath, [path.resolve(process.argv[1])])
  }
}else{
  app.setAsDefaultProtocolClient('station-monitor')
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

//windows
const gotTheLock = app.requestSingleInstanceLock()

if(!gotTheLock){
  app.quit()
}else{
  app.on('second-instance',(event,commandLine,workingDirectory) => {
    
    if(mainWindow){
      if(mainWindow.isMinimized())
        mainWindow.restore()
      mainWindow.focus()
    }
  })
}

app.on('open-url',(event,url)=>{
  dialog.showErrorBox('Welcome Back','You have come from:${url}')
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  initAutoUpdater();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// Initialize auto-updater
function initAutoUpdater() {
  // Set the URL for the update feed (your development server)
  autoUpdater.setFeedURL({
    url: 'https://your-development-server.com/update', // Replace with your development server URL
    serverType: 'json' // Set to 'json' if your server provides updates in JSON format
  });

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();
}

// IPC event for getting app version
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

// Handle auto-update events
autoUpdater.on('update-available', () => {
  // Notify user that an update is available
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version of the application is available. Downloading now...',
    buttons: ['OK']
  });
});

autoUpdater.on('update-downloaded', () => {
  // Prompt the user to install the downloaded update
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Downloaded',
    message: 'The update has been downloaded. Do you want to install it now?',
    buttons: ['Install', 'Later']
  }).then((result) => {
    if (result.response === 0) {
      // Quit and install update
      autoUpdater.quitAndInstall();
    }
  });
});

// Handle auto-update errors
autoUpdater.on('error', (error) => {
  console.error('Auto-update error:', error.message);
});