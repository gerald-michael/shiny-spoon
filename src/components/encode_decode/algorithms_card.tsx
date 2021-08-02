import { useDrag } from "react-dnd"
import itemTypes from '../../utils'
import Paper from '@material-ui/core/Paper';
export interface AlgorithmCardProps {
    title: string,
}
const AlgorithmCard: React.FC<AlgorithmCardProps> = (props) => {
    const { title } = props;
    const [,drag] = useDrag(() => ({
        type: itemTypes.CARD,
        item: { title },
    }))
    return (
        <Paper ref={drag} elevation={2} sx={{ padding: 1 }}>
            {title}
        </Paper>
    );
}

export default AlgorithmCard;