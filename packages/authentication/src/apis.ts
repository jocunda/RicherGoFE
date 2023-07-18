import { api } from "../../utilities";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ResetPassRequest,
  ResetPassResponse,
  LogoutResponse,
  GetUserResponse,
} from "./types";

// export async function login(payload: LoginRequest) {
//   return api.post<LoginResponse>("/api/Authenticate/login", payload);
// }

export async function login(payload: LoginRequest) {
  console.log(payload);
  return api.post<LoginResponse>("/api/auth/login", payload);
}

export async function registerUser(payload: RegisterRequest) {
  return api.post<RegisterResponse>("/api/auth/register", payload);
}

export async function resetPassword(payload: ResetPassRequest) {
  return api.post<ResetPassResponse>("/api/auth/changePassword", payload);
}

export async function logoutUser() {
  return api.delete<LogoutResponse>("/api/auth/logout");
}

// export async function getUser() {
//   return api.get<GetUserResponse>("/api/Authenticate/userName");
// }

export async function getUser() {
  return api.get<GetUserResponse>("/api/auth/username");
}
