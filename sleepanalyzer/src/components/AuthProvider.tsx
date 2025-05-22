import React, { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  User,
  GoogleAuthProvider,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserLogin, UserSignup } from "@/types/interface";
import Loading from "@/pages/Loading";
import useAuth from "@/hooks/useAuth";

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
  changePassword: typeof changePassword;
  forgotPassword: typeof forgotPassword;
  verifyEmail: typeof verifyEmail;
};

const logIn = (creds: UserLogin) => {
  return signInWithEmailAndPassword(auth, creds.email, creds.password);
};

const signUp = (creds: UserSignup) => {
  return createUserWithEmailAndPassword(auth, creds.email, creds.password);
};

const verifyEmail = (user: User) => {
  return sendEmailVerification(user);
}

const logOut = () => {
  return signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

const updateUsername = (user: User, displayName: string) => {
  return updateProfile(user, { displayName: displayName });
};

const changePassword = (user: User, newPassword: string) => {
  return updatePassword(user, newPassword);
}

const forgotPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
}

// what we are going to pass and use on other pages
const AuthContext = createContext<AuthContextData>({
  user: auth.currentUser,
  logIn,
  signUp,
  logOut,
  googleSignIn,
  updateUsername,
  changePassword,
  forgotPassword,
  verifyEmail,
});

const AuthProvider = ({ children }: Props) => {
  const {user, pending} = useAuth();

  const value = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateUsername,
    changePassword,
    forgotPassword,
    verifyEmail,
  };

  if (pending) {
    return <><Loading/></>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
