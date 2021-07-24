import { Button, Paper, Typography, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from "@material-ui/core"
import { useState } from "react";
export default function FileAnalysis() {
    const [filePath, setFilePath] = useState("")
    const handleOnClick = () => {
        let result = window.api.sendSync("getFile", [{ name: 'All Files', extensions: ['*'] }])
        setFilePath(result.filePaths[0])
    }
    const handleSubmit = () => [

    ]
    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">File Analysis</Typography>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="action" name="actions">
                        <FormControlLabel value="signature" control={<Radio />} label="signature" />
                        <FormControlLabel value="extract" control={<Radio />} label="extract" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={handleOnClick}>Choose File</Button>
                {filePath && (<Typography>{filePath}</Typography>)}
                <Button variant="contained" type="submit">Analyze</Button>
            </form>
        </Paper>
    )
}