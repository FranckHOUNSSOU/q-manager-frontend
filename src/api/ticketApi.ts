import axios from "axios";
import { API_BASE_URL } from "./config";
import { getAccessToken } from "./auth";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketStatus   = "open" | "in_progress" | "resolved" | "closed";

export interface Ticket {
  _id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  subject: string;
  description: string;
  priority: TicketPriority;
  // assignedTo supprimé : l'assignation est automatique côté backend
}

// ─── Instance axios avec JWT automatique ──────────────────────────────────────

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Fonctions ─────────────────────────────────────────────────────────────────

/** Créer un ticket sans assignation — statut "open" */
export async function createTicket(payload: CreateTicketPayload): Promise<Ticket> {
  const { data } = await api.post<Ticket>("/tickets", payload);
  return data;
}

/** Tickets ouverts/en cours triés par date croissante (Player) */
export async function getOpenTickets(): Promise<Ticket[]> {
  const { data } = await api.get<Ticket[]>("/tickets");
  return data;
}

/** Tickets assignés à l'agent connecté (Processing) */
export async function getMyTickets(): Promise<Ticket[]> {
  const { data } = await api.get<Ticket[]>("/tickets/my-tickets");
  return data;
}

/** L'agent marque un ticket comme résolu → disparaît du Player */
export async function resolveTicket(ticketId: string): Promise<Ticket> {
  const { data } = await api.patch<Ticket>(`/tickets/${ticketId}/resolve`);
  return data;
}