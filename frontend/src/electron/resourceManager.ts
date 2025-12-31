import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'
import { BrowserWindow } from 'electron'

const POLLING_INTERVAL=500

export function pollResources(mainWindow : BrowserWindow){
     setInterval(async()=>{
     const cpuUsage =  await getCpuUsage();
     const ramUsage= getRamUsage();
     const storageData = getStorageData()

     mainWindow.webContents.send("statistics",{
        cpuUsage,
        ramUsage,
        storageUsage : storageData.usage
     })

     console.log({cpuUsage , ramUsage , storageUsage : storageData.usage});

     //static
     const obj =getStaticData();
     console.log(obj);
     },POLLING_INTERVAL);
}

function getCpuUsage(){
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
    // osUtils.cpuUsage((percentage)=>console.log(percentage*100));
}

function getRamUsage(){
    return 1-osUtils.freememPercentage();
}

function getStorageData(){
    const stats = fs.statfsSync(process.platform === 'win32'?'C://':'/'); // if windows check c drive else root of filesystem
    const total = stats.bsize* stats.blocks;// number of blocks * size in bytes
    const free = stats.bsize * stats.bfree; // size of each block * number of blocks

    return {
        total : Math.floor(total / 1_000_000_000), //divides by this gives gb
        usage : 1 - free / total  // percentage of free/total
    }
}

export function getStaticData(){
     const totalStorage = getStorageData().total;
     const cpuModel = os.cpus()[0].model;
     const totalMemoryGB = Math.floor (osUtils.totalmem()/1024);


     return {
        totalStorage , 
        cpuModel , 
        totalMemoryGB ,
     }
}