import { api } from "@mimo/utilities";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GetUserResponse,
} from "./types";

// export async function login(payload: LoginRequest) {
//   return api.post<LoginResponse>("/api/Authenticate/login", payload);
// }

export async function login(payload: LoginRequest) {
  console.log(payload);
  return api.post<LoginResponse>("/api/auth/login", payload);
}

export async function register(payload: RegisterRequest) {
  return api.post<RegisterResponse>("/api/auth/register", payload);
}

// export async function getUser() {
//   return api.get<GetUserResponse>("/api/Authenticate/userName");
// }

export async function getUser() {
  console.log("GET USER");
  return api.get<GetUserResponse>("/api/auth/username");
}
