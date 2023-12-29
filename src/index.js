const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setTitle('Made with 💖 by Kenley. (if you like it spend me: https://www.buymeacoffee.com/kenleydev )')
  win.setIcon(path.join(__dirname, 'assets', 'icon.png'));
  win.loadURL('https://24fire.de');
}

Menu.setApplicationMenu(null);

app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
