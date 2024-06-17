import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import TournamentCards from "../layouts/TournamentCards";
import { toast } from "react-toastify";

const HostedTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchHostedTournaments = async () => {
      try {
        const response = await axios.get("/host/user/tournaments");
        setTournaments(response.data);
      } catch (error) {
        toast.error("Failed to fetch hosted tournaments. Please try again.");
      }
    };

    fetchHostedTournaments();
  }, []);

  const handleDelete = (tournamentId) => {
    setTournaments(
      tournaments.filter((tournament) => tournament.id !== tournamentId)
    );
  };

  const handleEdit = (tournamentId) => {
    navigate(`/tournament/${tournamentId}/edit`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-darkbg3 text-white p-8">
        <h2 className="text-2xl text-[white] font-bold mb-4 text-center">
          Your Hosted Tournaments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {tournaments.map((tournament) => (
            <TournamentCards
              key={tournament.id}
              tournamentList={tournament}
              onDelete={handleDelete}
              onEdit={handleEdit}
              showDeleteButton={true}
              showEditButton={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HostedTournamentsPage;
