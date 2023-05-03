import React, { useRef } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.haveAccount);

  const emailInput = useRef();
  const passwordInput = useRef();

  const loginSignupHandler = () => {
    dispatch(authActions.haveAccount());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;


    if (!isLoggedIn) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfLD1ntDy077V7jZanzcOTGymMrnDokQM",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          let errorMessage = "Authentication Failed";
          throw new Error(errorMessage);
        }
        alert("Your Account Has Been Sucessfully Created You Can Now Login");
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfLD1ntDy077V7jZanzcOTGymMrnDokQM",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          let errorMessage = "Authentication Failed";
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(enteredEmail);
        const email = enteredEmail.replace("@", "").replace(".", "");
        dispatch(authActions.login({ token: data.idToken, email: email }));
      } catch (err) {
        alert(err);
      }
    }
    emailInput.current.value = ''
    passwordInput.current.value = ''
  };

  const forgotPasswordHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfLD1ntDy077V7jZanzcOTGymMrnDokQM",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailInput.current.value,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className={classes.auth}>
        <h1>{isLoggedIn ? "Login" : "SignUp"}</h1>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInput} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordInput} required />
          </div>
          <div className={classes.actions}>
            <button type="submit">{isLoggedIn ? "Login" : "SignUp"}</button>
          </div>
          <div className={classes.actions}>
            {isLoggedIn && (
              <button type="button" onClick={forgotPasswordHandler}>
                Forgot Password
              </button>
            )}
          </div>
        </form>
      </div>
      <div className={classes.actions}>
        <button onClick={loginSignupHandler}>
          {isLoggedIn
            ? "Dont have an account? SignUp"
            : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;