import axios from "axios";
import { API_BASE_URL } from "./config";

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: { "Content-Type": "application/json" },
});

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
  };
}

export interface RegisterPayload {
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
  password: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await authApi.post<LoginResponse>("/login", { email, password });
  return data;
}

export async function register(payload: RegisterPayload): Promise<LoginResponse> {
  const { data } = await authApi.post<LoginResponse>("/register", payload);
  return data;
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}
