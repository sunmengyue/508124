import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import BgImg from '../../assets/bg-img.png';
import DialogBubble from '../../assets/chat.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxWidth: "35%",
    position: "relative",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  bannerImg: {
    objectFit: "fill",
    height: "100%",
    width: "100%"
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgb(76, 151, 254, 0.6), rgba(58, 141, 255, 0.8))",
    zIndex: 2,
  },
  bannerContent:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 280
  },
  bannerTxt: {
    color: "#fff",
    lineHeight: 1.5,
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
      fontSize: 27
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 21
    },
  },
  chatBubble: {
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      width: 67,
      height: 66 
    },
    [theme.breakpoints.down('sm')]: {
      width: 55,
      height: 54
    },
  }

}));

const Banner = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <img src={BgImg} alt="banner" className={classes.bannerImg}/>
      <div className={classes.overlay}>
        <Box className={classes.bannerContent}>
          <img src={DialogBubble} alt="chatBubble" width={80} height={80} className={classes.chatBubble}/>
          <Typography variant="h4" className={classes.bannerTxt}>
            <Box>
              Converse with anyone
            </Box> <Box>with any language</Box></Typography>
        </Box>
      </div>
    </Grid>
  )
}

export default Banner
