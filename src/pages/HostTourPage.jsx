import React from "react";
import HostTournamentForm from "../components/HostTournamentForm";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

function HostTourPage() {
  return (
    <>
      <Navbar />
      <div className="bg-darkbg text-[white] min-h-screen min-w-screen flex justify-center">
        <div className="h-fit w-2/4 mt-2 mb-2 bg-ui flex flex-col justify-center items-center text-[color:white] rounded-md">
          <HostTournamentForm />
        </div>
      </div>
    </>
  );
}

export default HostTourPage;
