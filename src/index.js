const { app, Tray, BrowserWindow, Menu, nativeImage } = require('electron');
const path = require('path');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  });
  win.loadURL('https://24fire.de');
  win.setBackgroundColor('rgb(17, 24, 39)')
  win.setTitle('Made with 💖 by Kenley. (if you like it spend me: https://paypal.me/kenleydev)')
  win.setIcon(path.join(__dirname, 'assets', 'icon.png'));
}

Menu.setApplicationMenu(null);

app.on('ready', () => {
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets', 'icon.png'));
  tray = new Tray(icon);
  tray.setToolTip('24fire.de');
  tray.setTitle('Made with 💖 by Kenley.');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Hide',
      type: 'normal',
      icon: path.join(__dirname, 'assets', 'Hide.png'),
      click: () => {
        const isVisible = win && win.isVisible();
        if (isVisible) {
          win.hide();
        } else {
          win.show();
        }
      }
    },
    {
      label: 'Help',
      type: 'normal',
      icon: path.join(__dirname, 'assets', 'Help.png'),
      click: () => {
        win.loadURL('https://discord.gg/24fire');
      }
    },
    {
      label: 'Reload',
      type: 'normal',
      icon: path.join(__dirname, 'assets', 'Reload.png'),
      click: () => {
        win.reload();
      }
    },
    {
      label: 'Close',
      type: 'normal',
      icon: path.join(__dirname, 'assets', 'Close.png'),
      click: () => {
        win.close();
      }
    },
  ]);
  
  tray.setContextMenu(contextMenu);
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
