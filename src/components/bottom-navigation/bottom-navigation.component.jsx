import React, {Fragment, useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import {Icon} from '@iconify/react';
import homeOption from '@iconify/icons-grommet-icons/home-option';
import outlineFavoriteBorder from '@iconify/icons-ic/baseline-favorite-border';
import outlineShoppingBag from '@iconify/icons-ic/outline-shopping-bag';
import bxUser from '@iconify/icons-bx/bx-user';
import {useAuthContext} from '../../providers/auth-provider';
import useStyles from './bottom-navigation.styles';

function NavigationBottom() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const location = useLocation();
  const {currentUser} = useAuthContext();

  const navigations = [
    {
      value: 0,
      label: 'home',
      icon: homeOption,
      route: '/',
    },
    {
      value: 1,
      label: 'favorites',
      icon: outlineFavoriteBorder,
      route: '/favorites',
    },
    {
      value: 2,
      label: 'cart',
      icon: outlineShoppingBag,
      route: '/cart',
    },
    {
      value: 3,
      label: 'account',
      icon: bxUser,
      route: `${!currentUser ? '/signin' : '/user'}`,
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setValue(0);
        break;
      case '/favorites':
        setValue(1);
        break;
      case '/cart':
        setValue(2);
        break;
      case '/signup':
      case '/signin':
      case '/user':
        setValue(3);
        break;
      default:
        break;
    };
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <BottomNavigation
        className={classes.root}
        value={value}
        onChange={handleChange}>
        {
          navigations.map((nav, idx) => (
            <BottomNavigationAction
              key={idx}
              value={nav.value}
              label={<Typography variant="subtitle2">{nav.label.toUpperCase()}</Typography>}
              icon={<Icon className={classes.icon} icon={nav.icon}/>}
              to={nav.route}
              component={Link}/>
          ))
        }
      </BottomNavigation>
    </Fragment>
  );
};

export default NavigationBottom;
