// import { getStaticData } from "./resourceManager";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics : (callback : (statitics : any)=>void)=> callback({}),
    getStaticData : ()=> console.log("static")
})      //to bridge process data between main window and electron process