import { Paper, Typography } from "@material-ui/core";
import Board from './Board/board'
import Card from './Board/card'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            marginTop: 30,
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },

    }),
);

export default function Cryptography() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography>
                            Cryptography
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography>
                            Algorithm
                        </Typography>
                        <Board id="board-1" className="board">
                            <Card id="card-one" draggable="true">
                                Card One
                            </Card>
                        </Board>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography>
                            Stack
                        </Typography>
                        <Board id="board-2" className="board">
                            <Card id="card-two" draggable="true">
                                Card Two
                            </Card>
                        </Board>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Input
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Output
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}