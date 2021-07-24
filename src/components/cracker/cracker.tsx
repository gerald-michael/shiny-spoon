import { Autocomplete, Button, TextField, Typography } from "@material-ui/core"
import { useState } from "react";
export default function Cracker() {
    const [filePath, setFilePath] = useState("")
    const handleOnClick = () => {
       let result = window.api.sendSync("getFile",  [{ name: 'Text', extensions: ['txt'] }])
       setFilePath(result.filePaths[0])
    }
    return (
        <div>
            <form>
                <TextField label="Hash" />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={window.api.shiny_spoon.get_algorithms()}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Algorithm" />}
                />
                {filePath&&(<Typography>{filePath}</Typography>)}
                <Button onClick={handleOnClick}>Choose Password File</Button>
                <Button variant="contained" type="submit">Run</Button>
            </form>
        </div>
    )
}
