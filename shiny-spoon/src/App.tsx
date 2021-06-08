import { SideBarAndNavBar, Footer, Steganography, FileAnalysis, Cryptography } from './components/index'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

function App() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <SideBarAndNavBar />
        <Router>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/" component={Cryptography} />
              <Route path="/steg" component={Steganography} />
              <Route path="/file" component={FileAnalysis} />
            </Switch>
            <Footer />
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
