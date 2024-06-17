import React, { useState } from "react";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeEmailForm = () => {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = async (e) => {
    e.preventDefault();

    if (newEmail !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }

    try {
      await axios.patch("/auth/change-email", {
        password,
        newEmail,
      });

      toast.success("Email updated successfully! Redirecting in 3 Seconds!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Password is incorrect or Email already existed");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-screen h-screen text-[white] flex items-center p-8 justify-center bg-darkbg3">
        <form
          onSubmit={handleChangeEmail}
          className="flex flex-col items-center gap-4 p-4 bg-darkbg2 w-[400px] h-[350px] text-[white] rounded-lg"
        >
          <h2 className="text-xl font-bold">Change Email</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <input
            type="email"
            placeholder="Confirm New Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded bg-button hover:bg-buttonhover"
          >
            Change Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailForm;
