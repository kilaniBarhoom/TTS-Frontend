import { axios } from "@/hooks/use-axios";
import { refreshEndp } from "@/lib/constants";
import { UserT } from "@/lib/types";
import { getAccessTokenFromLS, getRefreshTokenFromCookies } from "@/lib/utils";
import Cookies from "js-cookie";
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
    const values = {
      accessToken,
      refreshToken: getRefreshTokenFromCookies(),
    };
    const { data: response } = await axios.post(refreshEndp, values);

    const { token, refreshToken, memberId, name, email } = response;

    setAccessToken(token);
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    setUser({
      id: memberId,
      name,
      email,
    });
    return token;
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
