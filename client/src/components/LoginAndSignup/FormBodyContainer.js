import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formBody: {
    textAlign: "center"
  },
}));

const FormBodyContainer = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="flex-start" layout="row" spacing={3} className={classes.formBody}>
      {props.children}
    </Grid>
  )
}

export default FormBodyContainer
