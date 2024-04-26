import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth, useRefreshToken } from "@/providers/auth-provider";

import Loading from "../component/Loading";
import { useError } from "@/providers/error-provider";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const isLoggedIn = localStorage.getItem("isLoggedIn")?.toString() === "true";
  const { accessToken, setAccessToken } = useAuth();
  const { setError } = useError();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
        } else {
          setError({
            description: "Session expired please login again.",
          });
        }
      } catch (error: any) {
        if (error.code === "ERR_NETWORK") {
          setError({
            description: "Sorry, server unreachable at the moment.",
          });
        } else if (
          error.response.status === 401 ||
          error.response.data[0] === "Invalid client request"
        ) {
          setError({
            description: "Session expired please login again.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    !isLoggedIn || !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <Loading /> : <Outlet />;
};

export default PersistentLogin;
