import type { LoginInputs } from "../types/auth";
import axiosClient from "./axiosClient";

export const login = async ({ username, password }: LoginInputs) => {
  const res = await axiosClient.post("/api/auth/login", { username, password });
  localStorage.setItem("accessToken", res.data.token);
  localStorage.setItem("userId", res.data.userId);
  localStorage.setItem("username", res.data.username);
  return res.data;
};

export const registerAccount = async ({ username, password }: LoginInputs) => {
  const res = await axiosClient.post("/api/auth/register", {
    username,
    password,
  });
  return res.data;
};
