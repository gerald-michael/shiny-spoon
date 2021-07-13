import { Typography} from '@material-ui/core'
const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Shiny Spoon
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright