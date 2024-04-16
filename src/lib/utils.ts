import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialsOfFullName(name: string | undefined) {
  let initials = "";
  if (name) {
    const fullNameSplit = name.split(" ");
    const firstName = fullNameSplit[0];
    const lastName = fullNameSplit[fullNameSplit.length - 1];
    initials = `${firstName.charAt(0) ?? ""} ${lastName.charAt(0) ?? ""}`;
  }
  return initials;
}
