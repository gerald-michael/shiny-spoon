import { IconButton, FormControl, MenuItem, Select, InputLabel, Typography, Paper } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { useContext } from 'react'
import { EncoderDecoderContext } from "../../../store/context/encoder_decoder"
import { SelectChangeEvent } from '@material-ui/core/Select';
import { useState } from 'react';

export interface Base58Props {
    title: string,
    id: string,
    algorithm_key: any,
}
export default function Base58(props: Base58Props) {
    const { deleteFromChain, modifyKeyChain } = useContext(EncoderDecoderContext)
    const { title, id } = props;
    const [alphabet, setAlphabet] = useState<string>('default')
    const handleClick = () => {
        deleteFromChain(id)
    }
    const handleChange = (event: SelectChangeEvent<string>) => {
        setAlphabet(event.target.value as string)
        modifyKeyChain(event.target.value, id)
    }
    return (
        <Paper elevation={2} sx={{ alignItems: "center" }}>
            <Paper sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingY: 1, }}>{title}</Typography> <IconButton onClick={handleClick}><CancelIcon /></IconButton>
            </Paper>
            <FormControl sx={{ minWidth: 150, marginLeft: 3, marginY: 2 }}>
                <InputLabel id="algorithm-label">Alphabet</InputLabel>
                <Select
                    labelId="algorithm-label"
                    id="algorithm-select"
                    value={alphabet}
                    label="Alphabet"
                    onChange={handleChange}
                >
                    <MenuItem value={"default"}>Default</MenuItem>
                    <MenuItem value={"bitcoin"}>Bitcoin</MenuItem>
                    <MenuItem value={"monero"}>Monero</MenuItem>
                    <MenuItem value={"ripple"}>Ripple</MenuItem>
                    <MenuItem value={"flicker"}>Flicker</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    )
}
