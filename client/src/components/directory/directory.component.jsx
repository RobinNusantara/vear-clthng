import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './directory.styles';

function Directory({...props}) {
  const classes = useStyles(props);
  const history = useHistory();
  const {name, xs, md} = props;

  const moveToCollectionsPage = () => history.push(`/collections/${name}`);

  return (
    <Fragment>
      <Grid item xs={xs} md={md}>
        <div className={classes.root} onClick={moveToCollectionsPage}>
          <div className={classes.image}/>
          <div className={classes.content}>
            <Typography className={classes.textHeader} variant="body2">
              {name.toUpperCase()}
            </Typography>
            <Typography variant="body2">SHOP NOW</Typography>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export default Directory;
