const { ipcRenderer, contextBridge, nativeImage } = require("electron")
const shinny_spoon_service = require('../../shiny-spoon-service/lib/index')
class Cracker {
    constructor(hash, threads, callback) {
        this._cracker = shinny_spoon_service.cracker_new(hash, threads, callback)
    }
    get_counter() {
        return shinny_spoon_service.get_counter(this._cracker)
    }
    cracker_crack_using_password_file(algorithm, file_path, buff_size) {
        return shinny_spoon_service.cracker_crack_using_password_file(this._cracker, algorithm, file_path, buff_size)
    }
}
let cracker;
contextBridge.exposeInMainWorld(
    "api",
    {
        shiny_spoon: shinny_spoon_service,
        nativeImage: nativeImage,
        cracker_new: (hash, threads, callback) => {
            cracker = new Cracker(hash, threads, callback)
        },
        cracker_counter: ()=>{
            return cracker.get_counter()
        },
        cracker_hash: (algorithm, file_path, buff_size)=>{
            return cracker.cracker_crack_using_password_file(algorithm, file_path, buff_size)
        },
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