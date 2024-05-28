
import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/hooks/use-axios";
import { registerEndp } from "@/lib/constants";
import { UserT } from "@/lib/types";

import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import { RegisterSchemaType, registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./form";

const Register = () => {
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

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

  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: RegisterSchemaType) {
    setError(undefined);
    try {
      const { data: response } = await axios.post(registerEndp, values);

      const { memberId, name, email, token } = response;

      const userData: UserT = {
        id: memberId,
        name,
        email,
      };

      setUser(userData);
      setAccessToken(token);

      setUser(userData);
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("isLoggedIn", "true");
      toast({
        variant: "default",
        title: t("Welcome To TTS, {{name}}", { name: name }),
        duration: 2500,
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK" || !error?.response) {
        setError({
          description: "Sorry, server unreachable at the moment.",
        });
      } else {
        registerForm.setValue("password", "");
        setError({
          description: error.response.data.message,
        });
      }
    } finally {
      setPasswordInputFocused(false);
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/projects", { replace: true });
    }
  }, []);
  const loadingToRegister = registerForm.formState.isSubmitting;
  return (
    <RegisterForm
      onSubmit={onSubmit}
      registerForm={registerForm}
      loadingToRegister={loadingToRegister}
      passwordInputFocused={passwordInputFocused}
      setPasswordInputFocused={setPasswordInputFocused}
    />
  );
};

export default Register;
