import ErrorHandler from "@/components/error/ErrorHandler";
import PersistentLogin from "@/components/routing/PresistLogin";
import RequireAuth from "@/components/routing/RequiredAuth";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistentLogin />}>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/reister" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route element={<RequireAuth />}>
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/unauthorized"
            element={<ErrorHandler status={403} title="Unauthorized!" />}
          />
        </Route>
        <Route />
        {/* <Route path="/" element={<NavLayout />}>
          <Route element={<RequireAuth />} />
          <Route path="/projects" element={<Projects />} /> 
          <Route path="/projects/:projectId" element={<Tickets />} />
          <Route path="/projects/:projectId/tickets/:ticketId" element={<Ticket />} />
        </Route> */}
      </Route>
      <Route
        path="/"
        element={<ErrorHandler status={500} title="Server Error" />}
      />

      <Route
        path="*"
        element={<ErrorHandler status={404} title="Page Not Found!" />}
      />
    </>
  )
);

export default router;
