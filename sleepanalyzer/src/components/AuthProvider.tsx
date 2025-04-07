import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  GoogleAuthProvider,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserLogin, UserSignup } from "@/types/interface";
import { abort } from "process";

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
  updateUsername: typeof updateUsername;
};

const logIn = (creds: UserLogin) => {
  return signInWithEmailAndPassword(auth, creds.email, creds.password);
};

const signUp = (creds: UserSignup) => {
  return createUserWithEmailAndPassword(auth, creds.email, creds.password);
};

const logOut = () => {
  return signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

const updateUsername = (user: User, displayName: string) => {
  const updatedUser = updateProfile(user, { displayName: displayName });
  if (auth.currentUser != null) {
    auth.updateCurrentUser(user);
  }
  return updatedUser;
};

// what we are going to pass and use on other pages
const AuthContext = createContext<AuthContextData>({
  user: auth.currentUser,
  logIn,
  signUp,
  logOut,
  googleSignIn,
  updateUsername,
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateUsername,
  };

  useEffect(() => {
    // tells us if a user is logged in or not by checking if auth changed
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
