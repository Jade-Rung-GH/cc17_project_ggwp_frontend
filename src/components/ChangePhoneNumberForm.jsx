import React, { useState } from "react";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePhoneNumberForm = () => {
  const [password, setPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleChangePhoneNumber = async (e) => {
    e.preventDefault();

    try {
      await axios.patch("/auth/change-phone-number", {
        password,
        newPhoneNumber,
      });

      toast.success(
        "Phone number updated successfully! Redirecting in 3 Seconds!"
      );
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Password or Phone Number is incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-screen h-screen text-[white] flex items-center p-8 justify-center bg-darkbg3">
        <form
          onSubmit={handleChangePhoneNumber}
          className="flex flex-col items-center gap-4 p-4 bg-darkbg2 w-[350px] h-[350px] text-[white] rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4">Change Phone Number</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <input
            type="text"
            placeholder="New Phone Number, e.g. 0123456789"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded bg-button hover:bg-buttonhover"
          >
            Change Phone Number
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePhoneNumberForm;
