import { SideBarAndNavBar, Steganography, IpAnalysis, FileAnalysis, Footer, Cracker, PasswordAnalysis, Settings} from './components/index'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeContext } from './store/context/theme';
import { useContext, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
function App() {
  const { theme, themeCheckState } = useContext(ThemeContext)
  useEffect(() => {
    themeCheckState()
  }, [])
  const themeMui = createTheme({
    palette: {
      // type: theme.theme == null ? "light" : theme.theme,
    },
  });
  return (
    <>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <SideBarAndNavBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <ThemeProvider theme={themeMui}>
              <DndProvider backend={HTML5Backend}>
                <Switch>
                  {/* <Route path="/" exact component={EncodeDecode} /> */}
                  <Route path="/steg" exact component={Steganography} />
                  <Route path="/ip" exact component={IpAnalysis} />
                  <Route path="/file" exact component={FileAnalysis} />
                  <Route path="/settings" exact component={Settings} />
                  <Route path="/passwd" exact component={PasswordAnalysis} />
                  <Route path="/cracker" exact component={Cracker} />
                </Switch>
                <Footer />
              </DndProvider>
            </ThemeProvider>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
