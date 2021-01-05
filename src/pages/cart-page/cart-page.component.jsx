import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bagsFetchSelector, bagsLoadingSelector} from '../../utils/carts-selector';
import {fetchCartsItems, destroyCartsState} from '../../actions/carts.action';
import {totalPrice, formatPrice} from '../../utils/utils';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../../components/container/container.component';
import MuiButton from '../../components/mui-button/mui-button.component';
import MuiSpinner from '../../components/mui-spinner/mui-spinner.component';
import DataTableCart from '../../components/data-table-cart/data-table-cart';
import DataEmptyTable from '../../components/data-empty-table/data-empty-table.component';
import {Icon} from '@iconify/react';
import trashOutline from '@iconify/icons-eva/trash-outline';
import EmptyCartImage from '../../assets/images/empty-cart.svg';
import useStyles from '../../styles/cart-favorite-page.styles';

function CartPage() {
  const dispatch = useDispatch();
  const carts = useSelector(bagsFetchSelector);
  const isFetching = useSelector(bagsLoadingSelector);

  useEffect(() => {
    dispatch(fetchCartsItems());
    return () => dispatch(destroyCartsState());
  }, [dispatch]);

  return (
    <Fragment>
      <Container>
        <PageWrapper>
          {
            isFetching ? <MuiSpinner/> :
            carts.length === 0 ? <DataEmptyTable icon={EmptyCartImage} title="cart"/> :
            <Fragment>
              <CartHeader/>
              <DataTableCart/>
              <CartContent/>
            </Fragment>
          }
        </PageWrapper>
      </Container>
    </Fragment>
  );
};

function CartHeader() {
  const classes = useStyles();
  const carts = useSelector(bagsFetchSelector);

  return (
    <div className={classes.header}>
      <div className={classes.leftBox}>
        <Typography className={classes.textHeader} variant="h6">
          Cart
        </Typography>
        <Typography
          className={classes.textSubtitle}
          variant="subtitle1"
          color="textSecondary">
          {carts.length} Items
        </Typography>
      </div>
      <div className={classes.rightBox}>
        <IconButton className={classes.icon}>
          <Icon height={24} width={24} icon={trashOutline}/>
        </IconButton>
      </div>
    </div>
  );
}

function CartContent() {
  const classes = useStyles();
  const carts = useSelector(bagsFetchSelector);

  return (
    <div className={classes.content}>
      <Typography className={classes.totalCount} variant="subtitle1">
        {`Total ${formatPrice(totalPrice(carts))}`}</Typography>
      <div className={classes.button}>
        <MuiButton
          width={180}
          _width="100%"
          variant="contained"
          color="primary">Checkout</MuiButton>
      </div>
    </div>
  );
}

export default CartPage;
