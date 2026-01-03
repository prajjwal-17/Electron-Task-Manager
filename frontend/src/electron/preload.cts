// import { getStaticData } from "./resourceManager";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics : (callback )=> {
        ipcOn("statistics",(stats)=>{
            callback(stats);
        })
        
    },
    getStaticData : ()=> ipcInvoke('getStaticData'), //invoke expects a response (resolves with a response)
} satisfies Window["electron"])      //to bridge process data between main window and electron process

function ipcInvoke<Key extends keyof EventPayloadMapping>(
    key : Key
): Promise <EventPayloadMapping[Key]>{
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
    key : Key,
    callback : (payload : EventPayloadMapping[Key])=> void
){
    electron.ipcRenderer.on(key, (_: any, payload: EventPayloadMapping[Key])=>callback(payload))
}