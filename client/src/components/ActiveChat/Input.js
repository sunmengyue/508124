import React, { useState, useRef } from "react";
import {
  FormControl,
  FilledInput,
  IconButton,
  InputLabel,
  InputBase,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    position: "relative"
  },
  attachContainer: {
    position: "absolute",
    right: 50,
    transform: "translate(0, -230%)",
    display: "flex",
    alignItems: "center"
  },
  attachField: {
    opacity: 0
  },
  attachBtn: {
    "&:hover": {
      background: "none"
    }
  },
  attachIcon: {
    "&:hover": {
      color: "#3A8DFF"
    },
    transition: "0.1s ease-in-out"
  },
  customText: {
    color: theme.palette.secondary.main
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user, isSendingImages } =
    props;
  const [imgs, setImgs] = useState([]);
  const customTextRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleImgChange = (event) => {
    setImgs(event.target.files);
    if (event.target.files.length) {
      if (event.target.files.length === 1) {
        customTextRef.current.textContent = event.target.value.match(
          /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
      } else {
        customTextRef.current.textContent = `${event.target.files.length} files attached`;
      }
    } else {
      customTextRef.current.innerHTML = "No file chosen yet";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.text.value && !event.target.file.files.length) {
      return;
    }
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(event, reqBody);
    setText("");
    setImgs([]);
    event.target.file.value = "";
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
      <InputBase
        id="icon-button-file"
        name="file"
        type="file"
        inputProps={{ multiple: true }}
        onChange={handleImgChange}
        className={classes.attachField}
      />
      <InputLabel
        htmlFor="icon-button-file"
        className={classes.attachContainer}
      >
        <Typography className={classes.customText} ref={customTextRef}>
          {isSendingImages ? "Sending images..." : "No files attached yet"}
        </Typography>
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          className={classes.attachBtn}
        >
          <AttachFileIcon className={classes.attachIcon} />
        </IconButton>
      </InputLabel>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isSendingImages: state.imageSendingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (event, message) => {
      dispatch(postMessage(event, message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
