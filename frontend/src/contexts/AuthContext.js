import React, { useState, useEffect, useContext } from "react";
import { auth } from "../auth/firebase";

const AuthContext = React.createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    try {
      await auth.signOut();
      return { message: "Successfully logged out!", success: true };
    } catch (err) {
      return {
        message: "Something went wrong. Please try again later.",
        success: false,
      };
    }
  };

  const logIn = async (email, password) => {
    try {
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      return { message: "Successfully logged in!", success: true };
    } catch (err) {
      let message;
      switch (err.code) {
        case "auth/user-not-found":
          message = "No user exists with this email address. Please try again.";
          break;
        case "auth/invalid-email":
          message = "The email address is invalid. Please try again.";
          break;
        case "auth/wrong-password":
          message = "The password is incorrect. Please try again.";
          break;
        case "auth/user-disabled":
          message =
            "This user account has been disabled. Please contact us for further assistance.";
          break;
        default:
          message = "Something went wrong. Please try again later.";
          break;
      }
      return { message: message, success: false };
    }
  };

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      return { message: "User successfully created!", success: true };
    } catch (err) {
      let message;
      switch (err.code) {
        case "auth/email-already-in-use":
          message = "The email is already in use. Please try another.";
          break;
        case "auth/invalid-email":
          message = "The email address is invalid. Please try again.";
          break;
        case "auth/weak-password":
          message =
            "The password must be at least 6 characters. Please try again.";
          break;
        default:
          message = "Something went wrong. Please try again later.";
          break;
      }
      return { message: message, success: false };
    }
  };

  const getToken = async () => {
    console.log("getToken");
    try {
      const token = await auth.currentUser.getIdToken();
      console.log("Token retrieval successful.");
      return token;
    } catch (err) {
      console.log("Token retrieval failed.");
    }
  };

  const verifyEmail = async (user) => {
    console.log("sending verification");
    try {
      await user.sendEmailVerification();
      return {
        message:
          "A verification link has been sent to your e-mail. Please verify in order to log-in.",
        success: true,
      };
    } catch (err) {
      return {
        message: "Something went wrong. Please try again later.",
        success: false,
      };
    }
  };

  const sendResetEmail = async (email) => {
    console.log("sending password reset");
    try {
      const resp = await auth.sendPasswordResetEmail(email);
      console.log(resp);
      return {
        message: "A reset link has been sent to the e-mail address.",
        success: true,
      };
    } catch (err) {
      console.log(err.message);
      let message;
      switch (err.code) {
        case "auth/invalid-email":
          message = "The email address is invalid. Please try again.";
          break;
        case "auth/user-not-found":
          message = "No user exists with this email address. Please try again.";
          break;
        default:
          message = "Something went wrong. Please try again later.";
          break;
      }
      return { message: message, success: false };
    }
  };

  const isLoggedIn = user && user.emailVerified;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsub;
  }, []);

  const providerValue = {
    user,
    isLoggedIn,
    getToken,
    verifyEmail,
    logIn,
    signUp,
    signOut,
    sendResetEmail,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider as default, useAuthContext };
