import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: blueGrey[700],
      light: blueGrey[50],
    },
    info: {
      main: blue[700],
      light: blue[100],
    },
    error: {
      main: red[700],
      light: red[100],
    },
    success: {
      main: green[700],
      light: green[50],
    },
    text: {
      secondary: blueGrey[700],
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    h4: {
      'fontWeight': 'bold',
      '@media screen and (max-width: 600px)': {
        fontSize: 24,
      },
    },
    h6: {
      'fontSize': 16,
      'fontWeight': 'bold',
    },
    subtitle1: {
      'fontSize': 14,
      '@media screen and (max-width: 600px)': {
        fontSize: 12,
      },
    },
    subtitle2: {
      fontSize: 12,
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        height: 0,
      },
    },
    MuiTab: {
      root: {
        'textTransform': 'capitalize',
        'borderRadius': 4,
        'paddingLeft': 18,
        'paddingRight': 18,
        'marginRight': 8,
        'marginLeft': 8,
        'backgroundColor': blueGrey[50],
        '&$selected': {
          color: 'white',
          backgroundColor: grey[900],
        },
      },
    },
  },
});

export default theme;
