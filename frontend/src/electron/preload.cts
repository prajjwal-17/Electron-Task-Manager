// import { getStaticData } from "./resourceManager";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics : (callback : (statistics : any)=>void)=> {
        electron.ipcRenderer.on("statistics",(_: any, stats: any)=>{
            callback(stats);
        })
        
    },
    getStaticData : ()=> console.log("static")
})      //to bridge process data between main window and electron process