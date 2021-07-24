const shinny_spoon_service = require('../../shiny-spoon-service/lib/index')
const { ipcRenderer, contextBridge, nativeImage } = require("electron")

contextBridge.exposeInMainWorld(
    "api",
    {
        shiny_spoon: shinny_spoon_service,
        nativeImage: nativeImage,
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["getFile", "open-error-dialog"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["result-get-file", 'opened-error-dialog'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, args) => func(event, args));
            }
        },
        sendSync: (channel, data) => {
            // whitelist channels
            let validChannels = ["getFile", "saveFile", "chooseFile"];
            if (validChannels.includes(channel)) {
                let result = ipcRenderer.sendSync(channel, data);
                return result
            }
        },
    }
)