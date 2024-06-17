import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const AttendedTournamentPage = () => {
  const [attendedTournaments, setAttendedTournaments] = useState([]);

  useEffect(() => {
    const fetchAttendedTournaments = async () => {
      try {
        const response = await axios.get("/attend/attended-tournaments");
        setAttendedTournaments(response.data);
      } catch (error) {
        toast.error("Failed to fetch attended tournaments. Please try again.");
      }
    };
    fetchAttendedTournaments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/attend/attended-tournaments/${id}`);
      setAttendedTournaments(
        attendedTournaments.filter((tournament) => tournament.id !== id)
      );
      toast.success("Attendance deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete attendance. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-[white] min-h-screen flex p-8 justify-center bg-darkbg3">
        <div className="w-full text-white p-8 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">
            Attended Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendedTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-darkbg text-[white] rounded-lg h-80 shadow-lg"
              >
                <div className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl mb-2">
                      {tournament.games.gameName} Tournament By{" "}
                      {tournament.username}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Start: {new Date(tournament.startTour).toLocaleString()}
                    </p>
                    <p className="text-gray-400 mb-4">
                      End: {new Date(tournament.endTour).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(tournament.id)}
                    className="w-full px-4 py-2 mt-4 rounded text-[white] bg-redbutton hover:bg-redbuttonhover"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendedTournamentPage;
