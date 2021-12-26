import React, { useState, useRef } from "react";
import { FormControl, FilledInput, IconButton } from "@material-ui/core";
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
    transform: "translate(0, 30%)"
  },
  attachBtn: {
    "&:hover": {
      background: "none"
    }
  },
  attachIcon: {
    "&:hover": {
      color: "#3A8DFF",
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
  const { postMessage, otherUser, conversationId, user } = props;
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const customTextRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleImgChange = (event) => {
    setImgs(event.target.files);
    if (event.target.files.length) {
      if (event.target.files.length === 1) {
        customTextRef.current.textContent = event.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
      } else {
        customTextRef.current.textContent = `${event.target.files.length} files attached`;
      }
    } else {
      customTextRef.current.innerHTML = "No file chosen yet";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!event.target.text.value && !event.target.file.files.length) {
      return;
    };
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    let imgUrls= null;
    if (event.target.file.files.length) {
      customTextRef.current.innerHTML = "Sending images..."
      imgUrls = await uploadImage(event);
    }
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: imgUrls
    };
    await postMessage(reqBody);
    setText("");
    setImgs([]);
    event.target.file.value = "";
    customTextRef.current.innerHTML = "No file chosen yet";
  };

  const uploadImage = async(event) => {
    setImgs(event.target.file.files)
    const formData = new FormData();
    const imgUrls = [];
    for (let i = 0; i < imgs.length; i++) {
      let img = imgs[i];
      formData.append("file", img);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });
      const file = await res.json();
      imgUrls.push(file.url);
    }
    return imgUrls;
  }

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
      <input
        accept="image/*"
        id="icon-button-file"
        name="file"
        type="file"
        multiple
        onChange={handleImgChange}
        hidden
      />
      <label htmlFor="icon-button-file" className={classes.attachContainer}>
        <span className={classes.customText} ref={customTextRef}>No file chosen yet</span>
        <IconButton color="secondary" aria-label="upload picture" component="span" className={classes.attachBtn} >
          <AttachFileIcon className={classes.attachIcon}/>
        </IconButton> 
      </label>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
