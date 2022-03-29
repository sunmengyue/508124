import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    display: "flex",
    padding: 10
  },
  typingDot: {
    width: 8,
    height: 8,
    marginRight: 5,
    backgroundColor: "#d9e0f7",
    borderRadius: "50%",
    // opacity: 0,
    animation: "$loadingFade 1s infinite",
    "&:nth-child(1)": {
      animationDelay: "0s"
    }, 
    "&:nth-child(2)": {
      animationDelay: "0.2s"
    },
    "&:nth-child(3)": {
      animationDelay: "0.4s"
    },
  },
  "@keyframes loadingFade": {
    "0%": {
      opacity: 0
    },
    "50%": {
      opacity: 0.8
    },
    "100%": {
      opacity: 0
    }
  },
}));

const SendingIndicator = (props) => {
  const classes = useStyles();
  const {time, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Box className={classes.typingDot}></Box>
          <Box className={classes.typingDot}></Box>
          <Box className={classes.typingDot}></Box>
        </Box>
      </Box >
    </Box>
  );
};

export default SendingIndicator;

