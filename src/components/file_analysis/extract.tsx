import { Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { SyntheticEvent, useState } from "react";
interface IExtract {
    description: string,
    module_name: number,
    file_path: string,
    offset: number,
    valid: boolean,
    files: string,
    extract: boolean,
}
export default function FileAnalysis() {
    const [filePath, setFilePath] = useState("")
    const [extract, setExtract] = useState<IExtract[] | []>([])
    const handleOnClick = () => {
        let result = window.api.sendSync("getFile", [{ name: 'All Files', extensions: ['*'] }])
        setFilePath(result.filePaths[0])
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (filePath.length > 0) {

            let values = window.api.shiny_spoon.binwalk_signature_extract(filePath)
            console.log(values)
            setExtract(values)
        }
    }
    return (
        <>
            <Paper>
                <Typography variant="h6">Extract</Typography>
                <Button onClick={handleOnClick}>Choose File</Button>
                {filePath && (<Typography>{filePath}</Typography>)}
                <Button variant="contained" onClick={handleSubmit}>Extract</Button>
            </Paper>
            {extract.length > 0 && (
                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Offset</TableCell>
                                    <TableCell align="right">Files</TableCell>
                                    <TableCell align="right">Valid</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {extract.map((data) => (
                                    <TableRow
                                        key={data.offset}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            0x{data.offset.toString(16)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {data.files.replace('[',"").replace(']',"").replaceAll("'","")}
                                        </TableCell>
                                        <TableCell align="right">{data.valid.toString()}</TableCell>
                                        <TableCell align="right">{data.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </>
    )
}