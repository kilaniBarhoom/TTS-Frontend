import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useError } from "@/providers/error-provider";
import ErrorAlert from "../components/error-alert";

const LoginForm = ({
  onSubmit,
  loginForm,
  loadingToLogin,
}: {
  onSubmit: any;
  loginForm: any;
  loadingToLogin: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setError } = useError();
  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      error={!!loginForm.formState.errors.email?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Password")}</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      error={!!loginForm.formState.errors.password?.message}
                      autoComplete="current-password"
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
                      iconPosition={"right"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="ltr:ml-auto rtl:mr-auto -mt-3">
            <Typography
              as="mutedText"
              element="a"
              className="text-blue-400 cursor-pointer hover:underline"
            >
              {t("forgot password?")}
            </Typography>
          </div>
          <ErrorAlert />
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <Button
              className="w-full"
              type="submit"
              disabled={loadingToLogin}
              loading={loadingToLogin}
            >
              {t("Login")}
            </Button>
            <Typography as="smallText" element="span">
              {t("Don't have an account?")}{" "}
              <Typography
                as="mutedText"
                element="a"
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => {
                  setError(undefined);
                  navigate("/register");
                }}
              >
                {t("Register")}
              </Typography>
            </Typography>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
