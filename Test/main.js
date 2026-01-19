const { app, BrowserWindow } = require('electron');
const path = require('path');
const windowstateKeeper = require('electron-window-state');


function createWindow() {
    const mainWindowState=windowstateKeeper({
        defaultWidth:500,
        defaultHeight:600
    })
    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        // frame: false,
        // resizable: false,
        title:"Tic Tac Toe",
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
    mainWindowState.manage(win);
}

app.on('before-quit',(e)=>{
    // app.quit();
    console.warn("Quitting");
    e.preventDefault();
});

app.on('will-quit',(e)=>{
    console.warn("Will Quit");
    e.preventDefault();
})

app.on('browser-window-focus',()=>{
    console.log("Focused");
})

app.on('browser-window-blur',()=>{
    console.log("Blurred");
})

// app.whenReady().then(createWindow);
app.on('ready',createWindow);
