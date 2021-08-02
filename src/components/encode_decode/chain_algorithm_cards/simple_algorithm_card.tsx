import { IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import { useContext } from 'react';
import { EncoderDecoderContext } from "../../../store/context/encoder_decoder"
export interface SimpleAlgorithmCardProps {
    title: string,
    id: string,
}
export default function SimpleAlgorithmCard(props: SimpleAlgorithmCardProps) {
    const { deleteFromChain } = useContext(EncoderDecoderContext)
    const { title, id } = props;
    const handleClick = () => {
        deleteFromChain(id)
    }
    return (
        <Paper elevation={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingY: 1 }}>{title}</Typography> <IconButton onClick={handleClick}><CancelIcon /></IconButton>
        </Paper>
    )
}
