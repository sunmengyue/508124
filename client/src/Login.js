import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Banner from "./components/LoginAndSignup/Banner";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import ActionButton from "./components/LoginAndSignup/ActionButton";
import ActionUpper from "./components/LoginAndSignup/ActionUpper";
import ContentContainer from "./components/LoginAndSignup/ContentContainer";
import FormContainer from "./components/LoginAndSignup/FormContainer";
import FormHeader from "./components/LoginAndSignup/FormHeader";
import FormBodyContainer from "./components/LoginAndSignup/FormBodyContainer";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: "96%",
    position: "relative"
  },
  passwordReset: {
    color: theme.palette.primary.main,
    position: "absolute",
    right: 40,
    bottom: 48,
    fontSize:theme.typography.fontSize,
    cursor: "pointer"
  }
}));

const Login = (props) => {
  const classes = useStyles();
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
    <Grid container >
      <Banner />
      <ContentContainer>
        <ActionUpper historyPush="/register" action="Create account" question="Don't have an account?"/>
        <FormContainer>
          <form onSubmit={handleLogin} className={classes.formBody}>
            <FormHeader headerContent="Welcome back!"/>
            <FormBodyContainer>
              <Grid item className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>  
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                    variant="standard"
                  />
                </FormControl>
                <Typography className={classes.passwordReset}>Forgot?</Typography>
              </Grid>
              <ActionButton action="Create" />
            </FormBodyContainer>
          </form>
        </FormContainer>
      </ContentContainer>
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