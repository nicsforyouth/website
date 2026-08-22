import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: number) {
  const hours = Math.trunc(time / 3600);
  const minutes = Math.trunc((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  return [
    hours !== 0 ? hours : "",
    minutes !== 0 ? minutes : "",
    seconds.toString().padStart(2, "0"),
  ]
    .filter((s) => s !== "")
    .join(":");
  // return `${hours !== 0 && `${hours}:`}${minutes !== 0 && `${minutes}:`}${seconds}`;
}

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
