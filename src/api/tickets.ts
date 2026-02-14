import axios from "axios";
import { API_BASE_URL } from "./config";
import { getAccessToken } from "./auth";

const ticketsApi = axios.create({
  baseURL: `${API_BASE_URL}/tickets`,
  headers: { "Content-Type": "application/json" },
});

ticketsApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Ticket {
  _id: string;
  numero: string;
  type: string;
  assignedTo: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export async function createTicket(numero: string, type: string): Promise<Ticket> {
  const { data } = await ticketsApi.post<Ticket>("/", { numero, type });
  return data;
}

export async function getMyTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/my-tickets");
  return data;
}

export async function getAllTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/");
  return data;
}

export async function getAllTicketsPublic(): Promise<Ticket[]> {
  const { data } = await axios.get<Ticket[]>(`${API_BASE_URL}/tickets`);
  return data;
}

export async function getActiveTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/active");
  return data;
}

export async function getWaitingTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/waiting");
  return data;
}

export async function getInProgressTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/in-progress");
  return data;
}

export async function getMyActiveTickets(): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>("/my-tickets/active");
  return data;
}

export async function getTicketsByUser(userId: string): Promise<Ticket[]> {
  const { data } = await ticketsApi.get<Ticket[]>(`/user/${userId}`);
  return data;
}

export async function updateTicketStatus(ticketId: string, status: string): Promise<Ticket> {
  const { data } = await ticketsApi.patch<Ticket>(`/${ticketId}/status`, { status });
  return data;
}
