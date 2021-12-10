import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import BgImg from './assets/bg-img.png';
import DialogBubble from './assets/chat.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxWidth: 2000,
    margin: "auto",
    display: "flex",
    overflow: "hidden"
  },
  banner: {
    height: "100%",
    backgroundImage: `linear-gradient(to bottom, rgb(76, 151, 254, 0.6), rgba(58, 141, 255, 0.8)), url(${BgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  rightForm: {
    height: "100%",
    padding:"30px 10%",
    minWidth: 150
  },
  rightFormBody: {
    display: "flex",
    flexDirection: "column",
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root} >
      <Grid container item className={classes.banner} sm={5} xl={4}>
        <Box style={{marginTop: 200}}>
          <img src={DialogBubble} style={{marginBottom: 30}} alt="chatBubble"/>
          <Typography variant="h4" style={{lineHeight: 1.5, color: "#fff"}}>Converse with anyone with any language</Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.rightForm} sm={7} xl={8}>
        <Grid container item alignItems="center" justifyContent="flex-end" style={{height: 10}}>
          <Typography color="secondary" style={{ marginRight: 30}}>Already have an account</Typography>
          <Button onClick={() => history.push("/login")} color="primary" style={{padding: "15px 30px"}}>Login</Button>
        </Grid>
        <form onSubmit={handleRegister} className={classes.rightFormBody}>
          <Typography variant="h3" style={{ marginBottom: 50, fontSize: 30, fontWeight: 600 }}>Create an account.</Typography>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start" layout="row" spacing={6}>
            <Grid item>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                  style={{width: 350}}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                  style={{width: 350}}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  style={{width: 350}}
                />
                <FormHelperText >
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  style={{width: 350}}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" size="large" color="primary" style={{ marginTop: 40, padding:"16px 50px"}}>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
