import { createContext, useState, useContext } from "react";
import { UserT } from "@/lib/types";
import { axios } from "@/hooks/use-axios";

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
  const { data: response } = await axios.get("/auth", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data } = response;
  return data.user;
};

export const useRefreshToken = () => {
  const { setAccessToken } = useAuth();
  const refresh = async () => {
    const { data: response } = await axios.post("/auth/refresh");
    const { data } = response;
    const accessToken = data.accessToken;
    setAccessToken(accessToken);
    return accessToken;
  };
  return refresh;
};

export const useLogout = () => {
  const { setUser, setAccessToken } = useAuth();
  const logout = async (callEndpoint = true) => {
    try {
      if (callEndpoint) await axios.delete("/auth/logout");
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
