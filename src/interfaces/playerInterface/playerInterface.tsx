import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./playerInterface.css";
import { getOpenTickets } from "../../api/ticketApi";
import type { Ticket, TicketPriority } from "../../api/ticketApi";

// ─── Config ────────────────────────────────────────────────────────────────────

const POLL_MS = 5000;

const PRIORITY_COLOR: Record<TicketPriority, string> = {
  low:      "#22c55e",
  medium:   "#f59e0b",
  high:     "#f97316",
  critical: "#ef4444",
};

const PRIORITY_LABEL: Record<TicketPriority, string> = {
  low:      "Faible",
  medium:   "Moyen",
  high:     "Élevé",
  critical: "Critique",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

// ─── Composant ─────────────────────────────────────────────────────────────────

function PlayerInterface() {
  const navigate = useNavigate();
  const [tickets,    setTickets]    = useState<Ticket[]>([]);
  const [newIds,     setNewIds]     = useState<Set<string>>(new Set());
  const [loading,    setLoading]    = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchTickets = useCallback(async () => {
    try {
      const fresh: Ticket[] = await getOpenTickets();
      const sorted = [...fresh].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setTickets((prev: Ticket[]) => {
        const prevIds = new Set(prev.map((t) => t._id));
        const added   = sorted.filter((t) => !prevIds.has(t._id)).map((t) => t._id);
        if (added.length > 0) {
          setNewIds((n) => {
            const next = new Set([...n, ...added]);
            setTimeout(() => {
              setNewIds((cur) => {
                const cleaned = new Set(cur);
                added.forEach((id) => cleaned.delete(id));
                return cleaned;
              });
            }, 3000);
            return next;
          });
        }
        return sorted;
      });
      setLastUpdate(new Date());
    } catch {
      // silencieux
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
    const id = setInterval(fetchTickets, POLL_MS);
    return () => clearInterval(id);
  }, [fetchTickets]);

  const critical = tickets.filter((t: Ticket) => t.priority === "critical").length;
  const inProg   = tickets.filter((t: Ticket) => t.status === "in_progress").length;

  return (
    <div className="pi-page">
      {/* Header */}
      <div className="pi-header">
        <div className="pi-header-left">
          <button className="pi-back" onClick={() => navigate("/")}>← Retour</button>
          <div>
            <h1 className="pi-title">Interface Player</h1>
            <p className="pi-subtitle">File d'attente — tickets en cours</p>
          </div>
        </div>

        <div className="pi-stats">
          <div className="pi-stat-chip pi-chip-total">
            <span className="pi-stat-num">{tickets.length}</span>
            <span className="pi-stat-label">En attente</span>
          </div>
          <div className="pi-stat-chip pi-chip-progress">
            <span className="pi-stat-num">{inProg}</span>
            <span className="pi-stat-label">En cours</span>
          </div>
          {critical > 0 && (
            <div className="pi-stat-chip pi-chip-critical">
              <span className="pi-stat-num">{critical}</span>
              <span className="pi-stat-label">Critique</span>
            </div>
          )}
          <div className="pi-live">
            <span className="pi-live-dot" />
            {lastUpdate.toLocaleTimeString("fr-FR")}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="pi-content">
        {loading ? (
          <div className="pi-loading">Chargement des tickets…</div>
        ) : tickets.length === 0 ? (
          <div className="pi-empty">
            <div className="pi-empty-icon">✦</div>
            <p>Aucun ticket en attente pour le moment.</p>
          </div>
        ) : (
          <>
            <p className="pi-section-label">
              {tickets.length} ticket{tickets.length > 1 ? "s" : ""} — ordre d'arrivée
            </p>
            <div className="pi-list">
              {tickets.map((ticket: Ticket, index: number) => (
                <div
                  key={ticket._id}
                  className={`pi-card ${newIds.has(ticket._id) ? "pi-card-new" : ""}`}
                  style={{ borderLeftColor: PRIORITY_COLOR[ticket.priority] }}
                >
                  <div className="pi-position">{String(index + 1).padStart(2, "0")}</div>

                  <div className="pi-num">{ticket.ticketNumber}</div>

                  <div className="pi-info">
                    <div className="pi-subject">{ticket.subject}</div>
                    <div className="pi-meta">
                      <span
                        className="pi-priority"
                        style={{
                          color: PRIORITY_COLOR[ticket.priority],
                          background: `${PRIORITY_COLOR[ticket.priority]}18`,
                        }}
                      >
                        {PRIORITY_LABEL[ticket.priority]}
                      </span>
                      <span className="pi-status">
                        {ticket.status === "in_progress" ? "En cours" : "Ouvert"}
                      </span>
                      <span className="pi-date">
                        {formatDate(ticket.createdAt)} · {formatTime(ticket.createdAt)}
                      </span>
                      <span className="pi-creator">
                        Par {ticket.createdBy.firstName} {ticket.createdBy.lastName}
                      </span>
                    </div>
                  </div>

                  {ticket.assignedTo ? (
                    <div
                      className="pi-avatar pi-avatar-assigned"
                      title={`${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`}
                    >
                      {getInitials(ticket.assignedTo.firstName, ticket.assignedTo.lastName)}
                    </div>
                  ) : (
                    <div className="pi-avatar pi-avatar-none" title="Non assigné">?</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerInterface;