import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const JoinTournamentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`/host/tournaments/${id}`);
        setTournament(response.data);
      } catch (error) {
        toast.error("Failed to fetch tournament details. Please try again.");
      }
    };
    fetchTournament();
  }, [id]);

  useEffect(() => {
    if (tournament) {
      const initialTeamMembers = Array(tournament.teamAmount).fill("");
      if (tournament.teamLimit !== 1) {
        initialTeamMembers[0] = authUser.username; // Add the user as the first member
      }
      setTeamMembers(initialTeamMembers);
    }
  }, [tournament, authUser.username]);

  const handleMemberChange = (index, value) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleJoin = async (e) => {
    e.preventDefault();

    if (
      tournament.teamLimit !== 1 &&
      teamMembers.some((member, index) => index !== 0 && !member)
    ) {
      toast.error(`Please add ${tournament.teamAmount - 1} team members`);
      return;
    }

    try {
      const requestData = {
        tourId: id,
        teamLeadId: authUser.id,
        teamMembers,
      };

      const response = await axios.post("/attend", requestData);
      // console.log(response);
      toast.success("Successfully joined the tournament!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("You cannot join your own tournament.");
      } else {
        toast.error("Failed to join the tournament. Please try again.");
      }
    }
  };

  if (!tournament) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-darkbg2">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-darkbg3 text-[white]">
        <div className="bg-ui p-6 rounded-lg shadow-md w-1/2 h-[800px] text-center overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Team Attending Form</h2>
          <h3 className="text-xl mb-4">
            {tournament.games.gameName} Tournament Hosted By{" "}
            {tournament.username}
          </h3>
          <form onSubmit={handleJoin}>
            {tournament.teamLimit !== 1 && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="teamMembers"
                >
                  Team Members
                </label>
                {teamMembers.map((member, index) => (
                  <input
                    key={index}
                    id={`teamMember${index}`}
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2 bg-ui"
                    disabled={index === 0}
                    required
                  />
                ))}
              </div>
            )}
            <div className="flex flex-col mb-4 gap-2">
              <h3 className="text-xl font-bold mb-2">Tournament Details</h3>
              <p>
                <strong>Platform:</strong> {tournament.platform.platformName}
              </p>
              <p>
                <strong>Game:</strong> {tournament.games.gameName}
              </p>
              <p>
                <strong>Team:</strong> {tournament.teamOrNot ? "Yes" : "No"}
              </p>
              <p>
                <strong>Total Team Amount:</strong> {tournament.teamAmount}
              </p>
              <p>
                <strong>Team Player Limit:</strong> {tournament.teamLimit}
              </p>
              <p>
                <strong>Prize Pool:</strong> {tournament.prizePool}
              </p>
              <p>
                <strong>Location:</strong> {tournament.addressOrOnline}
              </p>
              <p>
                <strong>Rules:</strong> {tournament.rules}
              </p>
              <p>
                <strong>Tournament Start Date:</strong>{" "}
                {formatDate(tournament.startTour)}
              </p>
              <p>
                <strong>Tournament End Date:</strong>{" "}
                {formatDate(tournament.endTour)}
              </p>
              <p>
                <strong>Registration Start:</strong>{" "}
                {formatDate(tournament.registrationStartDate)}
              </p>
              <p>
                <strong>Registration End:</strong>{" "}
                {formatDate(tournament.registrationEndDate)}
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 bg-green-500 text-white rounded bg-buttonalt hover:bg-buttonhoveralt"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </>
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

export default JoinTournamentPage;
