import { Typography } from "@material-ui/core";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);
export default function IpAnalysis() {
    const classes = useStyles();
    return (
        <>
            <Paper>
                <Typography>Ip Analyis</Typography>
            </Paper>
            <div></div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}