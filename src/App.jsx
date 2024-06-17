import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <AuthContextProvider>
          <Router />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
        </AuthContextProvider>
      </Suspense>
    </>
  );
}

export default App;
