import PasswordChecker from "@/components/component/PasswordChecker";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { passwordValidChecker } from "@/lib/utils";
import { useError } from "@/providers/error-provider";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/error-alert";
const registerForm = ({
  onSubmit,
  registerForm,
  loadingToRegister,
  passwordInputFocused,
  setPasswordInputFocused,
}: {
  onSubmit: any;
  registerForm: any;
  loadingToRegister: boolean;
  passwordInputFocused: boolean;
  setPasswordInputFocused: (value: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const { setError } = useError();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const pagedirection = i18n.dir();
  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      error={!!registerForm.formState.errors.name?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      error={!!registerForm.formState.errors.email?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={registerForm.control}
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
                        registerForm.formState.errors.password &&
                        !(
                          passwordValidChecker(
                            registerForm.getValues().password
                          ).hasNumber &&
                          passwordValidChecker(
                            registerForm.getValues().password
                          ).hasSpecialCharacter &&
                          passwordValidChecker(
                            registerForm.getValues().password
                          ).hasUppercase &&
                          passwordValidChecker(
                            registerForm.getValues().password
                          ).isAtLeast8CharactersLong
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
                    <PasswordChecker
                      password={registerForm.getValues().password}
                    />
                  )}
                </FormItem>
              )}
            />
          </div>
          <ErrorAlert />
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <div className="w-full flex flex-col gap-2">
            <Button
              className="w-full"
              type="submit"
              loading={loadingToRegister}
              disabled={loadingToRegister}
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
                  navigate("/login");
                }}
              >
                {t("Login")}
              </Typography>
            </Typography>
          </div>
        </CardFooter>
      </form>
    </Form>
  );
};

export default registerForm;
