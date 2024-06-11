import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-darkbg">
      <div className="h-96 w-2/4 bg-ui flex flex-col justify-center items-center text-[color:white] rounded-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
