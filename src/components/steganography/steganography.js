import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const electron = window.require('electron');
const remote = electron.remote
const { dialog } = remote
// import from "shiny-spoon-service"
export default function Steganography() {
    const [image, setImage] = useState("")
    const handlePickFile = () => {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] },]
        }).then(result => {
            let image = "file://".concat(result.filePaths[0])
            setImage(image);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        console.log(image);
    }, [image])
    return (
        <>
            <Button color="primary" variant="contained" onClick={handlePickFile}>Select image</Button>
            <img src={image} alt="it will appear here" />
        </>
    )
}