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
import { toast, useToast } from "@/components/ui/use-toast";
import { axios } from "@/hooks/use-axios";
import { useAuth } from "@/providers/auth-provider";
import { useError } from "@/providers/error-provider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

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

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginSchemaType) {
    setError(undefined);
    try {
      // log the base url of the axios
      const { data: response } = await axios.post("/auth/login", values);
      const { data } = response;
      console.log(data);

      setUser(data.user);
      setAccessToken(data.token);
      localStorage.setItem("isLoggedIn", "true");
      toast({
        variant: "default",
        title: t("Welcome back, {{name}}", { name: data.user.username }),
        duration: 2500,
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK" || !error?.response) {
        setError({
          title: "Server unreachable",
          description: "Sorry, server unreachable at the moment.",
        });
      } else {
        form.setValue("password", "");
        setError({
          description: error.response.data.message,
        });
      }
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
        <CardTitle className="text-2xl">{t("Login")}</CardTitle>
        <CardDescription>
          {t("Enter your email below to login to your account")}.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="email" />
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
                        type="password"
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <Button className="w-full" type="submit">
              {t("Login")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

export default Login;
