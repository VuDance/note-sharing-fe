import axios from "axios";
import type { LoginInputs } from "../types/auth";

export const login = async ({ username, password }: LoginInputs) => {
  const res = await axios.post("/api/auth/login", { username, password });
  localStorage.setItem("accessToken", res.data.token); // lưu token
  return res.data;
};
