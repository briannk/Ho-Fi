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

  const signOut = () => {
    return auth.signOut();
  };

  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const getToken = async () => {
    console.log("getToken");
    return await auth.currentUser.getIdToken();
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsub;
  }, []);

  const providerValue = {
    user,
    logIn,
    signUp,
    getToken,
    signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider as default, useAuthContext };
