import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imgContainer: {
    width: (props) => {
      if (props.attachments.length === 1) {
        return 150;
      } else {
        return 200;
      }
    },
   display: "grid",
   gridTemplateColumns: (props) => {
    if (props.attachments.length !== 1) {
      return "1fr 1fr";
    } else {
      return "1fr";
    }
   },
   gridAutoRows: "minmax(80px, auto)",
   gap: 7,
   marginBottom: 7
  },
  imgItem: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    borderBottomLeftRadius: (props) => {
      if (props.fromOtherUser) {
        return 0;
      } else {
        return 10;
      }
    },
    borderBottomRightRadius: (props) => {
      if (props.fromOtherUser) {
        return 10;
      } else {
        return 0;
      }
    }
  }
}));

const ImageAttachments = (props) => {
  const classes = useStyles(props);

  return (
    <Box className={classes.imgContainer}>
        {props.attachments.map(url => <img src={url} key={url} className={classes.imgItem} alt="attachments"/>)}
    </Box>
  )
}

export default ImageAttachments;
