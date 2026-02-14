import axios from "axios";
import { API_BASE_URL } from "./config";

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: { "Content-Type": "application/json" },
});

authApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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
  role?: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await authApi.post<LoginResponse>("/login", { email, password });
  return data;
}

export async function register(payload: RegisterPayload): Promise<LoginResponse> {
  const { data } = await authApi.post<LoginResponse>("/register", payload);
  return data;
}

export async function getAllUsers(): Promise<User[]> {
  const { data } = await authApi.get<User[]>("/users");
  return data;
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function saveUser(user: LoginResponse["user"]) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): LoginResponse["user"] | null {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
