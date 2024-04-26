import { axios } from "@/hooks/use-axios";
import { logoutEndp, refreshEndp } from "@/lib/constants";
import { UserT } from "@/lib/types";
import { getAccessTokenFromLS } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

type AuthProviderState = {
  user: UserT | undefined;
  accessToken: string | undefined;
  setUser: (user: UserT | null) => void;
  setAccessToken: (accessToken: string) => void;
};

const initialState: AuthProviderState = {
  user: undefined,
  accessToken: undefined,
  setUser: () => null,
  setAccessToken: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserT | undefined>(() => {
    return undefined;
  });
  const [accessToken, setAccessToken] = useState<string | undefined>(() => {
    return undefined;
  });

  const value = {
    user,
    setUser: (user: UserT | null) => {
      if (!user) {
        setUser(undefined);
        return;
      }
      setUser(user);
    },
    accessToken,
    setAccessToken: (accessToken: string) => {
      setAccessToken(accessToken);
    },
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const getAuth = async (accessToken: string) => {
  const { data: response } = await axios.get("/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { user } = response;
  return user;
};

export const useRefreshToken = () => {
  const { setAccessToken, setUser } = useAuth();
  const refresh = async () => {
    const accessToken = getAccessTokenFromLS();
    try {
      const { data: response } = await axios.post(refreshEndp, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { token, memberId, name, email } = response;

      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      setUser({
        id: memberId,
        name,
        email,
      });
      return token;
    } catch {
      console.log("Error refrshing token.....");
    }
  };
  return refresh;
};

export const useLogout = () => {
  const { setUser, setAccessToken } = useAuth();
  const accessToken = getAccessTokenFromLS();
  const logout = async (callEndpoint = true) => {
    try {
      if (callEndpoint)
        await axios.post(logoutEndp, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setAccessToken("");
      localStorage.removeItem("isLoggedIn");
    }
  };
  return logout;
};

export default AuthProviderContext;
