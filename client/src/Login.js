import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Link
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
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
  loginInput: {
    width: 350,
    [theme.breakpoints.down('xs')]: {
      width: 150
    }
  }

}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
      <Grid item container className={classes.rightForm} sm={7} xl={8}>
        <Grid container item justifyContent="flex-end" alignItems="center" style={{height: 10}}>
          <Typography style={{ marginRight: 30}} color="secondary">Don't have an account?</Typography>
          <Button onClick={() => history.push("/register")} variant="text" color="primary" style={{padding: "15px 30px"}}>Create account</Button>
        </Grid>
        <form onSubmit={handleLogin} style={{ marginTop: 50 }}>
            <Typography variant="h3" style={{ marginBottom: 50, fontSize: 30, fontWeight: 600 }}>Welcom back!</Typography>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start" layout="row" spacing={6}>
            <Grid item >
              <FormControl margin="normal" required >
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  className={classes.loginInput}
                />
              </FormControl>
            </Grid>
            <Grid item style={{position: "relative"}}>
              <FormControl margin="normal" required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                  className={classes.loginInput}
                />
              </FormControl>
              <Link href="#" underline="none" style={{position: "absolute", bottom: 40, right: 20, fontSize: 14}}>
                {"Forgot?"}
              </Link>
            </Grid>
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 60, padding: "16px 55px"}}>
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
