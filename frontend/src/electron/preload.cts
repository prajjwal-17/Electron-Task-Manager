// import { getStaticData } from "./resourceManager";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics : (callback )=> {
        electron.ipcRenderer.on("statistics",(_: any, stats: any)=>{
            callback(stats);
        })
        
    },
    getStaticData : ()=> electron.ipcRenderer.invoke('getStaticData'), //invoke expects a response (resolves with a response)
} satisfies Window["electron"])      //to bridge process data between main window and electron process