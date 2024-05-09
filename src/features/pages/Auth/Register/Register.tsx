import PasswordChecker from "@/components/component/PasswordChecker";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import { axios } from "@/hooks/use-axios";
import { registerEndp } from "@/lib/constants";
import { UserT } from "@/lib/types";
import { passwordValidChecker } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import { RegisterSchemaType, registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  const { t, i18n } = useTranslation();
  const pagedirection = i18n.dir();
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

  const form = useForm<RegisterSchemaType>({
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
        form.setValue("password", "");
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
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          {t("Register")}
        </CardTitle>
        <CardDescription>
          {t("Enter your credentials below to register an account.")}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Name")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="name"
                        error={!!form.formState.errors.name?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="email"
                        error={!!form.formState.errors.email?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Password")}</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        onFocus={() => setPasswordInputFocused(true)}
                        autoComplete="current-password"
                        error={
                          form.formState.errors.password &&
                          !(
                            passwordValidChecker(form.getValues().password)
                              .hasNumber &&
                            passwordValidChecker(form.getValues().password)
                              .hasSpecialCharacter &&
                            passwordValidChecker(form.getValues().password)
                              .hasUppercase &&
                            passwordValidChecker(form.getValues().password)
                              .isAtLeast8CharactersLong
                          )
                        }
                        icon={
                          showPassword ? (
                            <Eye
                              onClick={() => setShowPassword(false)}
                              size={20}
                              className="cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              onClick={() => setShowPassword(true)}
                              size={20}
                              className="cursor-pointer"
                            />
                          )
                        }
                        iconPosition={`${
                          pagedirection === "ltr" ? "right" : "left"
                        }`}
                      />
                    </FormControl>
                    {!passwordInputFocused && <FormMessage />}
                    {passwordInputFocused && (
                      <PasswordChecker password={form.getValues().password} />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <div className="w-full flex flex-col gap-2">
              <Button
                className="w-full"
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                {t("Register")}
              </Button>
              <Typography as="smallText" element="span">
                {t("Already have an account?")}{" "}
                <Typography
                  as="mutedText"
                  element="a"
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => {
                    setError(undefined);
                    navigate("/");
                  }}
                >
                  {t("Login")}
                </Typography>
              </Typography>
            </div>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

export default Register;
