import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const HostTourPage = lazy(() => import("../pages/HostTourPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/Homepage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const UserSettingsPage = lazy(() => import("../pages/UserSettingsPage"));
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const ChangeEmailPage = lazy(() => import("../pages/ChangeEmailPage"));
const ChangePhoneNumber = lazy(() => import("../pages/ChangePhoneNumberPage"));
const JoinTournamentPage = lazy(() => import("../pages/JoinTournamentPage"));
const HostedTournamentsPage = lazy(() =>
  import("../pages/HostedTournamentPage")
);
const AttendedTournamentPage = lazy(() =>
  import("../pages/AttendedTournamentPage")
);
const TournamentEditPage = lazy(() => import("../pages/TournamentEditPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user/host",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<h1>Loading...</h1>}>
          <HostTourPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<h1>Loading...</h1>}>
          <UserSettingsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings/change-password",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<h1>Loading...</h1>}>
          <ChangePasswordPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings/change-email",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangeEmailPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings/change-phone-number",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePhoneNumber />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/tournament/:id/join",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <JoinTournamentPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings/hosted-tournaments",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <HostedTournamentsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/settings/attended-tournaments",
    element: (
      <ProtectedRoute>
        <AttendedTournamentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tournament/:id/edit",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <TournamentEditPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
