// frontend/src/components/ChangePasswordForm.jsx
import React, { useState } from "react";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await axios.patch("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password updated successfully! Redirecting in 3 Seconds");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-screen h-screen text-[white] flex items-center p-8 justify-center bg-darkbg3">
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col items-center gap-4 p-4 bg-darkbg2 w-[400px] h-[350px] text-[white] rounded-lg"
        >
          <h2 className="text-xl font-bold">Change Password</h2>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-darkbg"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded bg-button hover:bg-buttonhover"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
