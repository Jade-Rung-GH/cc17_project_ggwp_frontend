import React from "react";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-darkbg">
      <div className="h-[600px] w-2/4 bg-ui flex flex-col justify-center items-center text-[color:white] rounded-md">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
