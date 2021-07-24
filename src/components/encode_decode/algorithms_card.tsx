import { useDrag } from "react-dnd"
import itemTypes from '../../utils'
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export interface AlgorithmCardProps {
    title: string,
}
const AlgorithmCard: React.FC<AlgorithmCardProps> = (props) => {
    const { title } = props;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemTypes.CARD,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return (
        <Item ref={drag}>
            {title}
        </Item>
    );
}

export default AlgorithmCard;