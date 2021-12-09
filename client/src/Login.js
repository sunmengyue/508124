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
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.7), rgba(58, 141, 255, 0.9)), url(${BgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  bannerText: {
    color: "#fff",
    lineHeight: 1.5
  },

  rightForm: {
    height: "100%",
    paddingLeft:"10%" ,
    paddingRight: "10%",
  },

  formWelcome: {
    fontSize: 30,
    fontWeight: 600,
  },

  rightFormBody: {
    marginTop: 50
  },
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
      <Grid item className={classes.banner} sm={5} xl={4}>
        <Box style={{marginTop: 200}}>
          <img src={DialogBubble} style={{marginBottom: 30}}/>
          <Typography variant="h4" className={classes.bannerText}>Converse with anyone with any language</Typography>
        </Box>
      </Grid>
      <Grid item container className={classes.rightForm} sm={7} xl={8}>
          <Grid container item className={classes.rightFormHeader} justifyContent="flex-end" alignItems="center">
            <Typography style={{ marginRight: "5%"}}>Don't have an account?</Typography>
            <Button onClick={() => history.push("/register")} variant="text" color="primary" >Create account</Button>
          </Grid>
        <form onSubmit={handleLogin} className={classes.rightFormBody}>
          <Grid>
            <Typography variant="h3" className={classes.formWelcome} style={{ marginBottom: 50 }}>Welcom back!</Typography>
            <Grid >
              <FormControl margin="normal" required >
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  style={{width: 900}}
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                fullWidth
                label="password"
                aria-label="password"
                type="password"
                name="password"
                style={{width: 900, marginTop: 80}}
              />
            </FormControl>
            <Grid container justifyContent="center" alignItems="center">
              <Button type="submit" variant="contained" size="large" color="primary" style={{ marginTop: 100, width: 200, height: 70}}>
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
