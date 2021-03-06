import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {insertItemToCart} from '../../actions/carts.action';
import {insertItemToWishlist} from '../../actions/wishlist.action';
import {authUserSelector} from '../../utils/auth-selectors';
import {bagsLoadingSelector, bagsErrorSelector} from '../../utils/carts-selector';
import {favoritesLoadingSelector, favoritesErrorSelector} from '../../utils/favorites-selectors';
import {formatPrice, errorMessage, actionError} from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import MuiSnackbar from '../mui-snackbar/mui-snackbar.component';
import {Icon} from '@iconify/react';
import outlineFavoriteBorder from '@iconify/icons-ic/baseline-favorite-border';
import plusOutline from '@iconify/icons-eva/plus-outline';
import useStyles from './mui-card-product.styles';

function MuiCardProduct({...product}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(authUserSelector);
  const cartErrorMessage = useSelector(bagsErrorSelector);
  const cartLoading = useSelector(bagsLoadingSelector);
  const wishlistErrorMessage = useSelector(favoritesErrorSelector);
  const wishlistLoading = useSelector(favoritesLoadingSelector);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [cartOpenSnackbar, setCartOpenSnackbar] = useState(false);
  const [wishlistOpenSnackbar, setWishlistOpenSnackbar] = useState(false);
  const {id, productName, productBrand, productPrice, images} = product;

  const mouseEnter = () => setIsMouseInside(true);

  const mouseLeave = () => setIsMouseInside(false);

  const handleOpenCartSnackbar = () => {
    setCartOpenSnackbar(true);
    dispatch(insertItemToCart(id));
  };

  const handleOpenWishlistSnackbar = () => {
    setWishlistOpenSnackbar(true);
    dispatch(insertItemToWishlist(id));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setCartOpenSnackbar(false);
    setWishlistOpenSnackbar(false);
  };

  const moveToCollectionPage = () => history.push(`/product/details/${id}`);

  const Snackbar = (loading, value, error, message) => {
    if (loading) return null;
    return (
      <MuiSnackbar
        open={value}
        handleClose={handleClose}
        severity={errorMessage(error) ? 'success' : 'error'}>
        {actionError(error, user, message)}
      </MuiSnackbar>
    );
  };

  return (
    <Fragment>
      <Grid item xs={6} md={4} lg={3}>
        <Card
          className={classes.root}
          elevation={0}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}>
          <CardMedia className={classes.cardImage} image={images[0].productImage}/>
          <CardActions className={classes.cardActions} disableSpacing>
            <Grow in={isMouseInside}>
              <Paper className={classes.paper}>
                <IconButton onClick={handleOpenWishlistSnackbar}>
                  <Icon className={classes.icon} icon={outlineFavoriteBorder}/>
                </IconButton>
              </Paper>
            </Grow>
            <Grow
              in={isMouseInside}
              style={{transformOrigin: '0 0 0'}}
              {...(isMouseInside ? {timeout: 1000} : {})}>
              <Paper className={`${classes.paper} ${classes.spacing}`}>
                <IconButton onClick={handleOpenCartSnackbar}>
                  <Icon className={classes.icon} icon={plusOutline}/>
                </IconButton>
              </Paper>
            </Grow>
          </CardActions>
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.textBold}
              variant="subtitle1"
              onClick={moveToCollectionPage}>
              {productName}
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              {productBrand}
            </Typography>
            <Typography className={`${classes.textBold} ${classes.spacing}`} variant="subtitle1">
              {formatPrice(productPrice)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Fragment>
        {Snackbar(cartLoading, cartOpenSnackbar, cartErrorMessage, 'shopping cart')}
      </Fragment>
      <Fragment>
        {Snackbar(wishlistLoading, wishlistOpenSnackbar, wishlistErrorMessage, 'shopping wishlist')}
      </Fragment>
    </Fragment>
  );
};

export default MuiCardProduct;
