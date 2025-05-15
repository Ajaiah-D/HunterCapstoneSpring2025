import { AuthContext } from "@/components/AuthProvider";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import getFirebaseErrorMessage from "@/hooks/getFirebaseErrorMessage";
import React, { useContext, useState } from "react";

type Props = {};

const ForgotPassword = (props: Props) => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setDisabled(true);
      await forgotPassword(email);
      setMessage("Email Sent to " + email + "! Please check your inbox.");
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        setDisabled(false);
        // message gets narrowed to string!
        setError(getFirebaseErrorMessage(error.code));
        console.log(error);
      }
    }
  };

  return (
    <div className="center w-screen h-screen gap-10" id="login">
      <form className="grid items-center justify-items-center gap-5 border-2 border-white rounded-lg w-3/4 p-10 text-white bg-brightblue/50">
        <h1 className="text-5xl">Forgot Password</h1>
        <CustomInput
          placeholder="Email"
          type="email"
          title="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <CustomButton onClick={handleForgotPassword} disabled={disabled}>
          Send Email
        </CustomButton>
      </form>

      {/* Print Message that Email has been sent */}
      {message && (
        <div className="fixed bg-brightblue text-white p-5 right-3 bottom-3 rounded-md drop-shadow-xl">
          {message}
        </div>
      )}
      {/* Error message if there is an error */}
      {error && (
        <div className="bg-red-400 text-white p-5 rounded-md drop-shadow-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
