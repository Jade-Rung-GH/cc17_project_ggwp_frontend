import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user_icon.png";

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  const { logout, authUser } = useAuth();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="relative">
      <div role="button" onClick={() => setOpen((prev) => !prev)}>
        <img
          src={userIcon}
          alt="user"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      {open && (
        <div className="bg-ui absolute right-0 translate-y-1.5 rounded-md z-50">
          <div className="p-2 w-96 rounded-lg shadow-[0_0_6px_rgb(0,0,0,0.2)] bg-white">
            <Link to={`/user/settings`} onClick={() => setOpen(false)}>
              <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
                <div className="flex flex-col">
                  <span className="text-lg text-[white] font-semibold">
                    Your Profile
                  </span>
                </div>
              </div>
            </Link>
            <hr className="my-2 border border-[white]" />
            <div
              className="flex items-center hover:bg-gray-100 p-2 rounded-lg"
              role="button"
              onClick={handleClickLogout}
            >
              <div className="bg-gray-300 w-100 text-center rounded-full flex items-center justify-center"></div>
              <span className="text-lg text-[white] font-semibold">
                Log out
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
