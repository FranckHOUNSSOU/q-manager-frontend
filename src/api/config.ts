// En dev : proxy Vite /api -> http://localhost:3000 (évite CORS). En prod : VITE_API_URL ou backend direct.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "/api" : "http://localhost:3000");
