import React, { useState, useEffect, useContext } from "react";
import { auth } from "../auth/firebase";

const AuthContext = React.createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    // initialize with placeholder data maybe?
  });

  const signOut = async () => {
    return await auth.signOut();
  };

  const logIn = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };

  const getToken = async () => {
    console.log("getToken");
    return await auth.currentUser.getIdToken();
  };

  const verifyEmail = async (user) => {
    console.log("sending verification");
    return await user.sendEmailVerification();
  };

  const sendResetEmail = async (email) => {
    console.log("sending password reset");
    return await auth.sendPasswordResetEmail(email);
  };

  const isLoggedIn = () => {
    return user && user.emailVerified;
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      // console.log(user.emailVerified);
    });

    return unsub;
  }, []);

  const providerValue = {
    user,
    isLoggedIn,
    verifyEmail,
    logIn,
    signUp,
    getToken,
    signOut,
    sendResetEmail,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider as default, useAuthContext };
