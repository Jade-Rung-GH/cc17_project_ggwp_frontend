import axios from "../config/axios";

const hostApi = {};

hostApi.getAllTournaments = () => axios.get("/host/tournaments");

export default hostApi;
