import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialsOfFullName(name: string | undefined) {
  let initials = " ";
  if (name) {
    const fullNameSplit = name.split(" ");
    const firstName = fullNameSplit[0];
    const lastName = fullNameSplit[fullNameSplit.length - 1];
    initials = `${firstName.charAt(0) ?? ""} ${lastName.charAt(0) ?? ""}`;
  }
  return initials;
}

export function passwordValidChecker(password: string | null) {
  const conditions = {
    hasUppercase: /[A-Z]/.test(password ?? ""),
    hasSpecialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password ?? ""
    ),
    hasNumber: /\d/.test(password ?? ""),
    isAtLeast8CharactersLong: (password ?? "").length >= 8,
  };

  return conditions;
}

export function getAccessTokenFromLS() {
  return localStorage.getItem("accessToken");
}

export function getRefreshTokenFromCookies() {
  return Cookies.get("refreshToken");
}

export function setRefreshTokenInCookies(refreshToken: string) {
  return Cookies.set("refreshToken", refreshToken, { expires: 7 });
}

export const dateToString = (date: any) => {
  return format(Number(date), "y-LL-d");
};

export const stringToDate = (string: any) => {
  return new Date(string);
};
