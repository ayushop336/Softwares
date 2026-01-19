const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        alwaysOnTop: true,
        // frame: false,
        // resizable: false,
        title:"Tic Tac Toe",
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
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
