import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formBody: {
    marginTop: "15%"
  },
}));

const FormContainer = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.formBody}>
      {props.children}
    </Grid>
  )
}

export default FormContainer
