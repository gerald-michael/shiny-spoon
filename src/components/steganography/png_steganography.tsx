import { Button, Typography } from "@material-ui/core"
import { useState } from "react"
export default function PngSteganography() {
    const [filePath, setFilePath] = useState("")
    const handleOnClick = () => {
        let result = window.api.sendSync("getFile", [{ name: 'Png', extensions: ['png'] }])
        setFilePath(result.filePaths[0])
        let image = window.api.nativeImage.createFromNamedImage(result.filePaths[0])
        console.log(image.toDataUrl)
    }
    const handleOnSaveClick = () => {
        let result = window.api.sendSync("saveFile", [{ name: 'Png', extensions: ['png'] }])
        console.log(result)
    }
    const handleFileChoose = () => {
        let result = window.api.sendSync("getFile", [{ name: 'Png or txt', extensions: ['png', 'txt'] },])
        console.log(result)
    }
    return (
        <div>
            Png Steganography
            {filePath && (<Typography>{filePath}</Typography>)}
            <Button onClick={handleOnClick}>Choose Picture (png)</Button>
            <Button onClick={handleOnSaveClick}>Save Picture (png)</Button>
            <Button onClick={handleFileChoose}>choose file</Button>
        </div>
    )
}
