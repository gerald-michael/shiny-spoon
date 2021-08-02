import { Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { SyntheticEvent, useState } from "react";
interface ISignature {
    description: string,
    module_name: number,
    file_name: string,
    offset: number,
    valid: boolean
}
export default function Signature() {
    const [filePath, setFilePath] = useState("")
    const [signatures, setSignatures] = useState<ISignature[] | []>([])
    const handleOnClick = () => {
        let result = window.api.sendSync("getFile", [{ name: 'All Files', extensions: ['*'] }])
        setFilePath(result.filePaths[0])
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (filePath.length > 0) {
            let values = window.api.shiny_spoon.binwalk_signature_scan(filePath)
            setSignatures(values)
        }
    }
    return (
        <>
            <Paper>
                <Typography variant="h6">Signature Scan</Typography>
                <Button onClick={handleOnClick}>Choose File</Button>
                {filePath && (<Typography>{filePath}</Typography>)}
                <Button variant="contained" onClick={handleSubmit}>Analyze</Button>
            </Paper>
            {signatures.length > 0 && (
                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Offset</TableCell>
                                    <TableCell align="right">File Name</TableCell>
                                    <TableCell align="right">Valid</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {signatures.map((signature) => (
                                    <TableRow
                                        key={signature.offset}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            0x{signature.offset.toString(16)}
                                        </TableCell>
                                        <TableCell align="right">{signature.file_name}</TableCell>
                                        <TableCell align="right">{signature.valid.toString()}</TableCell>
                                        <TableCell align="right">{signature.description}</TableCell>
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