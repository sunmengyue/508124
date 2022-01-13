import React from 'react';
import {
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    backgroundColor: theme.palette.primary.main,
    width: 160,
    height: 56,
    color: "#fff",
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.button.fontWeight,
    fontSize: 16,
    alignSelf: "center",
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: 140,
      height: 50
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      height: 40
    },
  },
}));

const ActionButton = (props) => {
  const classes = useStyles();
  return (
    <Button type="submit" variant="contained"  className={classes.actionBtn} >
     {props.action}
    </Button>
  )
}

export default ActionButton
