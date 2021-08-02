import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@material-ui/core/styles'
import MuiDrawer from '@material-ui/core/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PasswordIcon from '@material-ui/icons/Password';
import SettingsIcon from '@material-ui/icons/Settings';
import { GiVirus } from "react-icons/gi";
import { useHistory } from "react-router-dom"
import { FaNetworkWired } from "react-icons/fa";
import { GiStegosaurusScales } from "react-icons/gi";
import { FcDataEncryption } from "react-icons/fc";
import { AiOutlineFileSearch, AiOutlineScan } from "react-icons/ai";
import { ThemeContext } from '../../store/context/theme';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import { Tooltip } from '@material-ui/core'
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { mui_theme, setTheme } = React.useContext(ThemeContext);
  const [darkMode, setDarkMode] = React.useState(mui_theme.theme === "dark");
  const setDark = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Shinny Spoon
          </Typography>
          <Tooltip title="light/dark">
            <IconButton color="inherit" onClick={setDark}>
              {mui_theme.theme === "dark" ? (<BrightnessLowIcon />) : (<BrightnessHighIcon />)}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => { history.replace('/') }}>
            <ListItemIcon>
              <FcDataEncryption />
            </ListItemIcon>
            <ListItemText primary="Encode and Decode" />
          </ListItem>
          <ListItem button onClick={() => history.replace('/hash')}>
            <ListItemIcon>
              <AiOutlineScan />
            </ListItemIcon>
            <ListItemText primary="Hash Identify" />
          </ListItem>
          <ListItem button onClick={() => history.replace('/steg')}>
            <ListItemIcon>
              <GiStegosaurusScales />
            </ListItemIcon>
            <ListItemText primary="Steganography" />
          </ListItem>
          <ListItem button onClick={() => { history.replace('/passwd') }}>
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Password Analysis" />
          </ListItem>
          <ListItem button onClick={() => { history.replace('/file') }}>
            <ListItemIcon>
              <AiOutlineFileSearch />
            </ListItemIcon>
            <ListItemText primary="File Analysis" />
          </ListItem>
          <ListItem button onClick={() => { history.replace('/ip') }}>
            <ListItemIcon>
              <FaNetworkWired />
            </ListItemIcon>
            <ListItemText primary="Ip Analysis" />
          </ListItem>
          <ListItem button onClick={() => { history.replace('/cracker') }}>
            <ListItemIcon>
              <GiVirus />
            </ListItemIcon>
            <ListItemText primary="Cracker" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => { history.replace('/settings') }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
