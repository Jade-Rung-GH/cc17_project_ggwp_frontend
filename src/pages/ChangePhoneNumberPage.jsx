import React from "react";
import ChangePhoneNumberForm from "../components/ChangePhoneNumberForm";
import Navbar from "../components/Navbar";

const ChangePhoneNumberPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-darkbg">
        <ChangePhoneNumberForm />
      </div>
    </>
  );
};

export default ChangePhoneNumberPage;
