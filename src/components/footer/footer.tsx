import { Paper } from '@material-ui/core'
import { Copyright } from '../index'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);
const Footer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Copyright />
    </Paper>
  )
}

export default Footer
