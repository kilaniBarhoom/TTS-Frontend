import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialsOfFullName(name: string | undefined) {
  let initials = " ";
  if (name) {
    const nameParts = name.split(" ");
    if (nameParts.length === 2) {
      initials = `${nameParts[0].charAt(0)} ${nameParts[1].charAt(0)}`;
    } else {
      initials = name.charAt(0);
    }
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
