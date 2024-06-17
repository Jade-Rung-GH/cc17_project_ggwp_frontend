import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className="text-[white] min-h-screen flex items-center p-8 justify-center bg-darkbg3">
        <div className="h-[500px] w-[500px] bg-ui text-white p-8 rounded-lg shadow-md flex flex-col gap-8">
          <h2 className="text-center text-2xl font-bold mb-6">
            {authUser?.username}'s Settings
          </h2>
          <div className="flex flex-col items-center gap-8">
            <button
              className="w-80 py-2 px-4 bg-button rounded-md hover:bg-buttonhover"
              onClick={() => navigate("/user/settings/change-password")}
            >
              Change Password
            </button>
            <button
              className="w-80 py-2 px-4 bg-button rounded-md hover:bg-buttonhover"
              onClick={() => navigate("/user/settings/change-email")}
            >
              Change Email
            </button>
            <button
              className="w-80 py-2 px-4 bg-button rounded-md hover:bg-buttonhover"
              onClick={() => navigate("/user/settings/change-phone-number")}
            >
              Change Phone Number
            </button>
            <div className="flex gap-4 mt-4">
              <button
                className="w-full py-2 px-4 bg-button rounded-md hover:bg-buttonhover"
                onClick={() => navigate("/user/settings/hosted-tournaments")}
              >
                Hosted Tournament
              </button>
              <button
                className="w-full py-2 px-4 bg-button rounded-md hover:bg-buttonhover"
                onClick={() => navigate("/user/settings/attended-tournaments")}
              >
                Attended Tournament
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettingsPage;
