import React from "react";
import ChangeEmailForm from "../components/ChangeEmailForm";
import Navbar from "../components/Navbar";

const ChangeEmailPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-darkbg">
        <ChangeEmailForm />
      </div>
    </>
  );
};

export default ChangeEmailPage;
