import { SideBarAndNavBar, Steganography, IpAnalysis, FileAnalysis, Footer, Cracker, PasswordAnalysis, Settings, EncodeDecode, HashIdentify } from './components/index'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeContext } from './store/context/theme';
import { useContext, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import EncoderDecoderProvider from './store/context/encoder_decoder'
// import { SnackbarProvider } from 'notistack';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
function App() {
  const { mui_theme, themeCheckState } = useContext(ThemeContext)
  useEffect(() => {
    themeCheckState()
  }, [])
  const themeMui = createTheme({
    palette: {
      mode: mui_theme.mui_theme == null ? "light" : mui_theme.mui_theme
    },
  });
  return (
    <>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <SideBarAndNavBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "98vh" }}>
            <DrawerHeader />
            <ThemeProvider theme={themeMui}>
            {/* <SnackbarProvider maxSnack={5}> */}
              <DndProvider backend={HTML5Backend}>
                <EncoderDecoderProvider>
                  <Switch>
                    <Route path="/" exact component={EncodeDecode} />
                    <Route path="/hash" exact component={HashIdentify} />
                    <Route path="/steg" exact component={Steganography} />
                    <Route path="/ip" exact component={IpAnalysis} />
                    <Route path="/file" exact component={FileAnalysis} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/passwd" exact component={PasswordAnalysis} />
                    <Route path="/cracker" exact component={Cracker} />
                  </Switch>
                </EncoderDecoderProvider>
              </DndProvider>
              {/* </SnackbarProvider> */}
            </ThemeProvider>
          </Box>
        </Box>
        <Footer />
      </Router>
    </>
  );
}

export default App;
