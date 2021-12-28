import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formHeader: {
    fontWeight: 600,
    marginBottom: 40,
    [theme.breakpoints.down('md')]: {
      fontSize: 27
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 24
    },
  },
}));

const FormHeader = (props) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.formHeader} >{props.headerContent}</Typography>
  )
}

export default FormHeader
