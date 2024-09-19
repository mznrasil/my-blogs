import configs from "@/configs";
import axios, { AxiosError } from "axios";
import { APIError } from "./types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const ONE_MINUTE = 1 * 60 * 1000;

export const API = axios.create({
  baseURL: configs.BACKEND_BASE_URL,
  timeout: ONE_MINUTE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const PublicAPI = axios.create({
  baseURL: configs.BACKEND_BASE_URL,
  timeout: ONE_MINUTE,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user && user.id) {
    config.headers["X-User-Id"] = user.id;
  } else {
    redirect("/api/auth/login");
  }

  return config;
});

export const handleAxiosError = (err: unknown) => {
  let message;
  if (err instanceof AxiosError) {
    message =
      (err as AxiosError<APIError>)?.response?.data?.message ??
      err?.cause?.message ??
      err?.message ??
      "Something went wrong";
    console.error("message", message);
    return message;
  } else if (err instanceof Error) {
    message = err.message;
  } else if (typeof err == "string") {
    message = err;
  } else {
    message = "Something went wrong";
  }

  return message;
};
