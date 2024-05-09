import ErrorHandler from "@/components/error/ErrorHandler";
import PersistentLogin from "@/components/routing/PresistentLogin";
import RequireAuth from "@/components/routing/RequiredAuth";
import AuthLayout from "@/features/pages/Auth/Layout";
import NavLayout from "@/components/navbar/layout";
import Login from "@/features/pages/Auth/Login/Login";
import Register from "@/features/pages/Auth/Register/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProjectsRoutes from "@/features/pages/Projects/routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistentLogin />}>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/*<Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route element={<RequireAuth />}>
          <Route
            path="/unauthorized"
            element={<ErrorHandler status={403} title="Unauthorized!" />}
          />
        </Route>
        <Route />
        <Route path="/" element={<NavLayout />}>
          <Route element={<RequireAuth />}>
            <Route
              path="/projects/*"
              element={<ProjectsRoutes />}
              errorElement={
                <ErrorHandler status={500} title="Internal Server Error!" />
              }
            />
            <Route
              path="/settings"
              element={<div className="text-muted">Settings</div>}
            />
          </Route>
        </Route>
      </Route>

      <Route
        path="*"
        element={<ErrorHandler status={404} title="Page Not Found!" />}
      />
    </>
  )
);

export default router;
