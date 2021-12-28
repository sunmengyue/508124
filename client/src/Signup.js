import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Banner from "./components/LoginAndSignup/Banner";
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import ActionButton from "./components/LoginAndSignup/ActionButton";
import ActionUpper from "./components/LoginAndSignup/ActionUpper";
import ContentContainer from "./components/LoginAndSignup/ContentContainer";
import FormBodyContainer from "./components/LoginAndSignup/FormBodyContainer";
import FormContainer from "./components/LoginAndSignup/FormContainer";
import FormHeader from "./components/LoginAndSignup/FormHeader";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: "100%"
  }
}));

const Login = (props) => {
  const classes = useStyles();
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
    <Grid container >
      <Banner />
      <ContentContainer>
        <ActionUpper historyPush="/login" action="Login" question="Already have an account?"/>
        <FormContainer>
          <form onSubmit={handleRegister} >
            <FormHeader headerContent="Create an account."/>
            <FormBodyContainer>
              <Grid item className={classes.gridItem}>
                <FormControl fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>
                <FormControl fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>
                <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item className={classes.gridItem}>
                <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <ActionButton action="Create"/>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);