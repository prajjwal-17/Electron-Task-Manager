import { ipcMain, WebContents, WebFrameMain } from "electron"
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() : boolean {
    return process.env.NODE_ENV === 'development'
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key : Key , 
    handler: ()=>EventPayloadMapping[Key]){
    ipcMain.handle(key,(event)=>{

        validateEventFrame(event.senderFrame);
        return handler()
    })
}
/*
Each IPC event name is mapped to exactly one payload/return type,
and your wrapper functions enforce that mapping everywhere.

If key is "getStaticData"

Then handler must return StaticData

It does not apply to "statistics" in practice, because "statistics" is not a request–response event.
*/

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key : Key,
    webContents : WebContents,
    payload : EventPayloadMapping[Key]
){
    webContents.send(key,payload)
}

export function validateEventFrame(frame : WebFrameMain | null){
    console.log(frame?.url)
    if (!frame) {
    throw new Error("Missing sender frame");
  }


    if(isDev() && new URL(frame.url).host === 'localhost:5123') { return }

    if(frame.url !== pathToFileURL(getUIPath()).toString()){ //pathToFile url makes it global
        throw new Error('Malicious Event');
    }
}
