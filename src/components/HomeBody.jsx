import TournamentCards from "../layouts/TournamentCards";
import RightBar from "./RightBar";
import hostApi from "../apis/host";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function HomeBody() {
  const [tournament, setTournament] = useState([]);

  const fetchTournaments = async () => {
    try {
      const response = await hostApi.getAllTournaments();
      // console.log(response.data);
      setTournament(response.data);
    } catch (error) {
      console.error("Error Fetching Data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);
  return (
    <div className="w-screen h-screen bg-darkbg2 flex justify-between">
      <div className="w-72"></div>
      <div className="grid grid-cols-4 gap-4 gap-y-4 mt-4 overflow-y-auto">
        {tournament?.map((item) => (
          <TournamentCards
            key={item.id}
            tournamentList={item}
            showDeleteButton={false}
          />
        ))}
      </div>
      <RightBar />
    </div>
  );
}

export default HomeBody;
