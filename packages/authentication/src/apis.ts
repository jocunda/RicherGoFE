import { api } from "@mimo/utilities";
import type { LoginRequest, LoginResponse, GetUserResponse } from "./types";

export async function login(payload: LoginRequest) {
  return api.post<LoginResponse>("/api/Authenticate/login", payload);
}

export async function getUser() {
  return api.get<GetUserResponse>("/api/Authenticate/userName");
}
