import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromWishlist} from '../../actions/wishlist.action';
import {favoritesFetchSelector} from '../../utils/favorites-selectors';
import {formatPrice} from '../../utils/utils';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Icon} from '@iconify/react';
import closeOutline from '@iconify/icons-eva/close-outline';
import useStyles from '../../styles/data-table.styles';

function DataTableFavorite() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesFetchSelector);

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.resetCell}>
                <Typography variant="subtitle1">Product</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">Description</Typography>
              </TableCell>
              <TableCell className={classes.tableDataHidden} align="left">
                <Typography variant="subtitle1">Price</Typography>
              </TableCell>
              <TableCell className={classes.resetCell} align="right">
                <Typography variant="subtitle1">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              favorites.map((favorite) => {
                const {productName, productColor, productPrice, images} = favorite.collection;
                const removeWishlist = () => dispatch(removeItemFromWishlist(favorite.id));
                return (
                  <TableRow key={favorite.id}>
                    <TableCell className={classes.resetCell} align="left">
                      <img className={classes.productImage} src={images[0].productImage} alt={productName}/>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={`${classes.productName} ${classes._textOverflow}`} variant="subtitle1">
                        {productName}
                      </Typography>
                      <Typography className={`${classes._textOverflow} ${classes.tableDataSpacing}`} variant="subtitle1">
                        {productColor}
                      </Typography>
                      <Typography className={`${classes.productPrice} ${classes.tableDataSpacing}`} variant="subtitle1">
                        {formatPrice(productPrice)}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableDataHidden} align="left">
                      {formatPrice(productPrice)}
                    </TableCell>
                    <TableCell className={classes.resetCell} align="right">
                      <IconButton onClick={removeWishlist}>
                        <Icon className={classes.icon} icon={closeOutline}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default DataTableFavorite;
