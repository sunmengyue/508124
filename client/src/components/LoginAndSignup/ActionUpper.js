import React from 'react';
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    backgroundColor: "#fff",
    width: 170,
    height: 54,
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.button.fontWeight,
    fontSize: theme.typography.button.fontSize,
    borderRadius: 5,
    boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
    [theme.breakpoints.down('md')]: {
      width: 140,
      height: 50
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      height: 40
    },
  },
  upperTxt: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.fontSize,
    marginRight: 30,
  }
}));

const ActionUpper = (props) => {
  const classes = useStyles();
  const { historyPush, action, question } = props;
  const history = useHistory();
  return (
    <Grid container item alignItems='center' justifyContent='flex-end'>
      <Typography className={classes.upperTxt}>{question}</Typography>
      <Button onClick={() => history.push(historyPush)} className={classes.actionBtn}>{action}</Button>
    </Grid>
  )
}

export default ActionUpper;
