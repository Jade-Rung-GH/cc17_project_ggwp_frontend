import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const HostTournamentForm = () => {
  const { authUser } = useAuth();
  const [formData, setFormData] = useState({
    platform_with_game_id: "",
    platform: "",
    game: "",
    customGame: "",
    teamOrNot: "single",
    teamAmount: "",
    teamLimit: "1", // Hardcode to make it work
    prizePool: "no",
    addressOrOnline: "online",
    rules: "",
    tourPassword: "",
    startTour: "",
    endTour: "",
    registrationStartDate: "",
    registrationEndDate: "",
    hostId: authUser ? authUser.id : "",
  });

  const games = [
    "Clash Royale",
    "League of Legends",
    "Gwent",
    "Call of Duty: Warzone",
    "PUBG",
    "Overwatch",
    "Fortnite",
    "Apex Legends",
    "Rocket League",
    "Custom Game",
  ];

  const platforms = ["PC", "PS5", "Xbox"];

  const teamLimits = [8, 16, 32, 64, 128];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamChange = (teamType) => {
    if (teamType === "single") {
      setFormData({ ...formData, teamOrNot: teamType, teamLimit: "1" });
    } else {
      setFormData({ ...formData, teamOrNot: teamType, teamLimit: "" });
    }
  };

  const [isPrivate, setIsPrivate] = useState(false);

  const handlePrivacyChange = (privacyType) => {
    if (privacyType === "public") {
      setIsPrivate(false);
      setFormData({ ...formData, tourPassword: "" });
    } else {
      setIsPrivate(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      if (data.teamOrNot === "single") {
        data.teamOrNot = true;
      } else {
        data.teamOrNot = false;
      }
      data.teamAmount = +data.teamAmount;
      data.teamLimit = +data.teamLimit;
      data.hostId = +data.hostId;
      // console.log(data);
      const response = await axios.post("/host", data);
      // console.log(response);
      toast.success("Tournament hosted successfully! Redirecting in 3 Seconds");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Error hosting tournament. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Choose your Game</h2>
        <select
          name="game"
          value={formData.game}
          onChange={handleChange}
          className="px-4 py-2 border rounded bg-darkbg2"
        >
          {games.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
        {formData.game === "Custom Game" && (
          <input
            name="customGame"
            value={formData.customGame}
            onChange={handleChange}
            placeholder="Custom Game"
            className="px-4 py-2 border rounded bg-darkbg2"
          />
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Platform</h2>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="px-4 py-2 border rounded bg-darkbg2"
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleTeamChange("single")}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.teamOrNot === "single"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Single
          </button>
          <button
            type="button"
            onClick={() => handleTeamChange("team")}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.teamOrNot === "team"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Team
          </button>
        </div>
        <h2 className="text-xl text-center font-bold">
          If you selected Team, how many Teams in total for the competition?
        </h2>
        {formData.teamOrNot === "team" && (
          <select
            name="teamLimit"
            value={formData.teamLimit}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full bg-darkbg2"
          >
            {teamLimits.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        )}
        {formData.teamOrNot === "single" && (
          <input
            name="teamLimit"
            value="1"
            readOnly
            className="px-4 py-2 border rounded w-full bg-darkbg2"
          />
        )}
        <input
          name="teamAmount"
          value={formData.teamAmount}
          onChange={handleChange}
          placeholder="Amount of Players / Players per Team"
          className="px-4 py-2 border rounded w-full bg-darkbg2"
        />
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Winnings</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, prizePool: "yes" })}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.prizePool === "yes"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, prizePool: "no" })}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.prizePool === "no"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            No
          </button>
        </div>
        {formData.prizePool === "yes" && (
          <input
            name="prizePoolAmount"
            value={formData.prizePoolAmount}
            onChange={handleChange}
            placeholder="Enter prize pool amount"
            className="px-4 py-2 border rounded w-full bg-darkbg2"
          />
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Location</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, addressOrOnline: "online" })
            }
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.addressOrOnline === "online"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Online
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, addressOrOnline: "offline" })
            }
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              formData.addressOrOnline === "offline"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Offline
          </button>
        </div>
        {formData.addressOrOnline === "offline" && (
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="px-4 py-2 border rounded w-full bg-darkbg2"
          />
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Standard Rules</h2>
        <textarea
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          placeholder="Rules"
          className="px-4 py-2 border rounded w-full h-32 bg-darkbg2"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Privacy Settings</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handlePrivacyChange("public")}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              !isPrivate ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Public
          </button>
          <button
            type="button"
            onClick={() => handlePrivacyChange("private")}
            className={`px-4 py-2 rounded bg-button hover:bg-buttonhover ${
              isPrivate ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Private
          </button>
        </div>
        {isPrivate && (
          <input
            name="tourPassword"
            value={formData.tourPassword}
            onChange={handleChange}
            placeholder="Tournament Password"
            className="px-4 py-2 border rounded w-full bg-darkbg2"
          />
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Tournament Dates</h2>
        <h3>Tournament Start Date</h3>
        <input
          name="startTour"
          value={formData.startTour}
          onChange={handleChange}
          placeholder="Start Date"
          type="date"
          className="px-4 py-2 border rounded w-full bg-darkbg2"
        />
        <h3>Tournament End Date</h3>
        <input
          name="endTour"
          value={formData.endTour}
          onChange={handleChange}
          placeholder="End Date"
          type="date"
          className="px-4 py-2 border rounded w-full bg-darkbg2"
        />
        <h3>Registration Start Date</h3>
        <input
          name="registrationStartDate"
          value={formData.registrationStartDate}
          onChange={handleChange}
          placeholder="Registration Start Date"
          type="date"
          className="px-4 py-2 border rounded w-full bg-darkbg2"
        />
        <h3>Registration End Date</h3>
        <input
          name="registrationEndDate"
          value={formData.registrationEndDate}
          onChange={handleChange}
          placeholder="Registration End Date"
          type="date"
          className="px-4 py-2 border rounded w-full bg-darkbg2"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-green-500 text-white rounded mt-4 bg-buttonalt"
      >
        Submit
      </button>
    </form>
  );
};

export default HostTournamentForm;
