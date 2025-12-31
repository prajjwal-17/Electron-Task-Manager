import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';


app.on("ready",()=>{
    const mainWindow = new BrowserWindow({
        webPreferences : {
           preload :  getPreloadPath(),   // we can use nodeIntegrations but it is a security vulnerability becuase then our browser will be able to interact with nodejs
        }
    });
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }
    else{
          mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html')) // this will get current app path(where app is running from)
    }

    pollResources(mainWindow)

    ipcMain.handle("getStaticData",()=>{
        return getStaticData();
    })

})