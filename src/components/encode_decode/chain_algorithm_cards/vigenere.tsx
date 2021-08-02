import { IconButton, TextField, Typography, Paper } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { ChangeEvent, useState, useContext } from 'react'
import { EncoderDecoderContext } from "../../../store/context/encoder_decoder"
export interface ViginereProps {
    title: string,
    id: string,
    algorithm_key: any,
}
export default function Viginere(props: ViginereProps) {
    const { deleteFromChain, modifyKeyChain } = useContext(EncoderDecoderContext)
    const { title, id } = props;
    const [key, setKey] = useState("")
    const handleClick = () => {
        deleteFromChain(id)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKey(event.target.value)
        modifyKeyChain(event.target.value, id)
    }
    return (
        <Paper elevation={2} sx={{}}>
            <Paper sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingY: 1, }}>{title}</Typography> <IconButton onClick={handleClick}><CancelIcon /></IconButton>
            </Paper>
            <TextField type="text" label="Key" sx={{ marginBottom: 1 }} required onChange={handleChange} value={key} />
        </Paper>
    )
}
