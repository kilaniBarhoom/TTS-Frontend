import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/hooks/use-axios";
import { loginEndp } from "@/lib/constants";
import { UserT } from "@/lib/types";
import { setRefreshTokenInCookies } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import { LoginSchemaType, loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./form";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.state?.from?.pathname;
  const search = location.state?.from?.search;
  const from =
    pathname && !["/logout", "/unauthorized"].includes(pathname)
      ? `${pathname}${search}`
      : "/projects";
  const { toast } = useToast();
  const { user, setUser, setAccessToken } = useAuth();
  const { setError } = useError();

  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "member1@mail.com",
      password: "Qwer$1234",
    },
  });
  async function onSubmit(values: LoginSchemaType) {
    setError(undefined);
    try {
      const { data: response } = await axios.post(loginEndp, values);

      const { memberId, name, email, token, refreshToken } = response;

      const userData: UserT = {
        id: memberId,
        name: name,
        email: email,
      };

      setUser(userData);
      setAccessToken(token);
      setRefreshTokenInCookies(refreshToken);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("isLoggedIn", "true");
      toast({
        variant: "default",
        title: t("Welcome back, {{name}}", { name: name }),
        duration: 2500,
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        setError({
          description: "Sorry, server unreachable at the moment.",
        });
      } else {
        loginForm.setValue("password", "");
        setError({
          description: error.response.data[0],
        });
      }
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/projects");
    }
  }, []);
  const loadingToLogin = loginForm.formState.isSubmitting;
  return (
    <LoginForm
      onSubmit={onSubmit}
      loginForm={loginForm}
      loadingToLogin={loadingToLogin}
    />
  );
};

export default Login;
