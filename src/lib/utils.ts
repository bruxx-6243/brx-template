import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs));
}

export function sum(a: number, b: number) {
  return a + b;
}

export const getAuthToken = () => {
  const token = "token";

  return token;
};
