import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../config/axios";

const TournamentCards = ({
  tournamentList,
  onDelete,
  showDeleteButton,
  showEditButton,
}) => {
  // console.log(tournamentList);
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`/tournament/${tournamentList.id}/join`);
  };

  const handleEdit = () => {
    navigate(`/tournament/${tournamentList.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/host/tournaments/${tournamentList.id}`);
      toast.success("Tournament deleted successfully!");
      onDelete(tournamentList.id);
    } catch (error) {
      toast.error("Failed to delete tournament. Please try again.");
    }
  };

  const formattedDate = formatDate(tournamentList?.registrationStartDate);

  const participantCalculation = () => {
    if (tournamentList.teamAmount !== 1) {
      return tournamentList.teamAmount * tournamentList.teamLimit;
    }
  };
  return (
    <div className="bg-darkbg text-[white] rounded-lg h-80 w-80 shadow-lg transition-transform transform hover:scale-105">
      <div className="p-5 h-full text-white flex flex-col justify-between items-stretch">
        <div>Image</div>
        <h3 className="text-xl mb-2">
          {tournamentList.games.gameName} Tournament By{" "}
          {tournamentList.username}
        </h3>
        <p className="text-gray-400 mb-4">Registration Ends: {formattedDate}</p>
        <div className="flex items-center mb-4">
          <div>{tournamentList.platformWithGameId}</div>
          <div>
            <h6>{participantCalculation()} Participants</h6>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          {showEditButton && (
            <button
              onClick={handleEdit}
              className="w-1/2 px-4 py-2 rounded text-[white] bg-buttonalt hover:bg-buttonhoveralt"
            >
              Edit
            </button>
          )}
          {showDeleteButton && (
            <button
              onClick={handleDelete}
              className="w-1/2 px-4 py-2 rounded text-[white] bg-redbutton hover:bg-redbuttonhover"
            >
              Delete
            </button>
          )}
          {!showDeleteButton && (
            <button
              onClick={handleJoin}
              className="w-full px-4 py-2 rounded text-[white] bg-button hover:bg-buttonhover"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate}, ${formattedTime}`;
}
export default TournamentCards;
