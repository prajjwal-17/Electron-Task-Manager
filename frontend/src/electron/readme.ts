/*
You created a type-safe IPC protocol.

Think of it like this:

protocol ElectronIPC {
  statistics: Statistics;     // push-only
  getStaticData: StaticData;  // request/response
}


Then every wrapper function:

accepts only valid protocol keys

enforces the correct data shape for that key

Why keyof is the magic
Key extends keyof EventPayloadMapping


This does two things:

Prevents invalid event names

Automatically links the event name to the correct payload type

So this is illegal:

ipcWebContentsSend("statistics", win.webContents, {
  cpuModel: "Intel"
});


Because "statistics" → Statistics, not StaticData.

We define a single mapping from IPC event names to data types,
and all IPC helpers are generic wrappers that enforce this mapping
for every send, invoke, and handler.

*/