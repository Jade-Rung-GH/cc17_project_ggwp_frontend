import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </>
  );
}

export default App;
