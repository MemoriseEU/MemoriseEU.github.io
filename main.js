const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  session,
} = require("electron");

let mainWindow;
const reactApp = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      enableTouchEmulation: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js", // Preload script for IPC communication
    },
  });

  mainWindow.setFullScreen(true);

  // Intercept requests and modify headers
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    delete details.responseHeaders["x-frame-options"];
    callback({ responseHeaders: details.responseHeaders });
  });

  // mainWindow.loadFile("index.html");
  reactApp
    ? mainWindow.loadURL("http://localhost:8083/")
    : mainWindow.loadURL("http://localhost:8084/");
}

// Helper function to create a BrowserView with a specified URL
function createBrowserView(url) {
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  view.webContents.loadURL(url);

  return view;
}

// Helper function to adjust the BrowserView to fit within the window below the menu
function adjustViewBounds(view) {
  const menuHeight = 50;
  view.setBounds({ x: 0, y: menuHeight, width: 1200, height: 750 });
  view.setAutoResize({ width: true, height: true });
}

app.whenReady().then(() => {
  /* session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["default-src 'self'"],
      },
    });
  }); */
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
