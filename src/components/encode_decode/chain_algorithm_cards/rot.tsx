import { IconButton, FormControl, MenuItem, Select, InputLabel, Typography, Paper } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { useContext } from 'react'
import { EncoderDecoderContext } from "../../../store/context/encoder_decoder"
import { SelectChangeEvent } from '@material-ui/core/Select';
import { useState } from 'react';

export interface RotProps {
    title: string,
    id: string,
    algorithm_key: any,
}
export default function Rot(props: RotProps) {
    const { deleteFromChain, modifyKeyChain } = useContext(EncoderDecoderContext)
    const { title, id } = props;
    const [algorithm, setAlgorithm] = useState<string>('5')
    const handleClick = () => {
        deleteFromChain(id)
    }
    const handleChange = (event: SelectChangeEvent<string>) => {
        setAlgorithm(event.target.value as string)
        modifyKeyChain(event.target.value, id)
    }
    return (
        <Paper elevation={2} sx={{ alignItems: "center" }}>
            <Paper sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
                <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingY: 1, }}>{title}</Typography> <IconButton onClick={handleClick}><CancelIcon /></IconButton>
            </Paper>
            <FormControl sx={{ minWidth: 150, marginLeft: 3, marginY: 2 }}>
                <InputLabel id="algorithm-label">Algorithm</InputLabel>
                <Select
                    labelId="algorithm-label"
                    id="algorithm-select"
                    value={algorithm}
                    label="Algorithm"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>Rot 5</MenuItem>
                    <MenuItem value={13}>Rot 13</MenuItem>
                    <MenuItem value={18}>Rot 18</MenuItem>
                    <MenuItem value={47}>Rot 47</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    )
}
