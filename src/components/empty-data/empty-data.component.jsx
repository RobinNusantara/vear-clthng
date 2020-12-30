import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './empty-data.styles';

function EmptyData({...messages}) {
  const classes = useStyles();
  const {icon, title} = messages;

  return (
    <div className={classes.root}>
      <figure className={classes.figure}>
        <img src={icon} alt="empty-data"/>
        <figcaption>
          <Typography className={classes.title} variant="h6">
            Your {title} is empty
          </Typography>
          <Typography className={classes.description} variant="subtitle1">
            Looks like you haven&apos;t made your choices yet
          </Typography>
        </figcaption>
      </figure>
    </div>
  );
}

export default EmptyData;
