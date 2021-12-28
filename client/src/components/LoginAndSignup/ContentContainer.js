import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: "30px 10%",
    flex: 1,
  },
}));

const ContentContainer = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.contentContainer}>
      {props.children}
    </Box>
  )
}

export default ContentContainer
