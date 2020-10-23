import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import {Icon} from '@iconify/react';
import closeOutline from '@iconify/icons-eva/close-outline';
import TableData from '../../data/table-data';
import useStyles from './custom-table.styles';

function CustomTable() {
  const classes = useStyles();
  return (
    <Fragment>
      <TableContainer className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT</TableCell>
              <TableCell align="left">DESCRIPTION</TableCell>
              <TableCell className={classes.productPrice} align="left">PRICE</TableCell>
              <TableCell align="left">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {
                  TableData.map((data, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left">
                        <div
                          className={classes.productImage}
                          style={{backgroundImage: `url(${data.productImage})`}}/>
                      </TableCell>
                      <TableCell className={classes.productDescription} align="left">
                        <Typography className={classes.productName} variant="subtitle1">
                          {data.productName.toUpperCase()}
                        </Typography>
                        <Typography className={classes.productColor} variant="subtitle1">
                          {data.productColor.toUpperCase()}
                        </Typography>
                        <Typography className={classes.descriptionPrice} variant="subtitle1">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR' }).format(data.productPrice)}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.productPrice} align="left">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR' }).format(data.productPrice)}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton>
                          <Icon
                            className={classes.icon}
                            height={24}
                            width={24}
                            icon={closeOutline}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default CustomTable;