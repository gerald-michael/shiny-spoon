import { IconButton, TextField, Typography, Paper, Box } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { ChangeEvent, useState, useContext } from 'react'
import { EncoderDecoderContext } from "../../../store/context/encoder_decoder"
import CoPrime from "@stdlib/math-base-assert-is-coprime"
export interface AffineProps {
    title: string,
    id: string,
    algorithm_key: any,
}
export default function Affine(props: AffineProps) {
    const { deleteFromChain, modifyKeyChain } = useContext(EncoderDecoderContext)
    const { title, id } = props;
    const handleClick = () => {
        deleteFromChain(id)
    }
    const [key1, setKey1] = useState<number>()
    const [key2, setKey2] = useState<number>()
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.id === "num1") {
            setKey1(parseInt(event.target.value))
        }
        if (event.target.id === "num2") {
            setKey2(parseInt(event.target.value))
        }
        // if (CoPrime(key1, key2)) {
        //     modifyKeyChain([key1, key2], id)
        // }
    }
    return (
        <Paper elevation={2} sx={{}}>
            <Paper sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingY: 1, }}>{title}</Typography> <IconButton onClick={handleClick}><CancelIcon /></IconButton>
            </Paper>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <TextField type="number" label="Num1" sx={{ marginBottom: 1, marginX: 1 }} required onChange={handleChange} id="num1" value={key1} />
                <TextField type="number" label="Num2" sx={{ marginBottom: 1, marginX: 1 }} required onChange={handleChange} id="num2" value={key2} />
            </Box>
            {/* {(key1!==undefined&&key2!==undefined)&&(<Typography></Typography>)} */}
            {/* {key1 && {!CoPrime(key1, key2) && <Typography color="error" sx={{ marginLeft: 1 }}>Key must be two coprime number</Typography>}} */}
        </Paper>
    )
}
