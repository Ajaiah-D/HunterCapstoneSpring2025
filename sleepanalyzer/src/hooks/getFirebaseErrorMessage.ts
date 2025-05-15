const getFirebaseErrorMessage = (code: string) => {
  var message = null;

  switch (code) {
    case "auth/user-not-found":
      message = "User doesn't exist.";
      break;

    case "auth/email-already-exists":
      message = "Email already exist";
      break;

    case "auth/invalid-credential":
      message = "Invalid Credential";
      break;

    case "auth/invalid-email":
      message = "Invalid Email";
      break;

    case "auth/invalid-password":
      message = "Incorrect Password";
      break;

    case "auth/missing-password":
      message = "Password must be provided";
      break;

    case "auth/too-many-requests":
      message = "You're exceed the limit. Try again after sometime.";
      break;

    case "auth/popup-closed-by-user":
      message = "Popup closed by user";
      break;
    
    case "auth/weak-password":
      message = "Password should be at least 6 characters";
      break;

    case "auth/missing-email":
      message = "Email is required";
      break;

    default:
      message = "Something went wrong";
      break;
  }

  return "Error: " + message;
};

export default getFirebaseErrorMessage;
