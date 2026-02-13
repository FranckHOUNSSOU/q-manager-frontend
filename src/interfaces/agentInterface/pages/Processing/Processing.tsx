import { useState, useEffect, useCallback } from "react";
import { getMyTickets, resolveTicket } from "../../../../api/ticketApi";
import type { Ticket, TicketPriority } from "../../../../api/ticketApi";
import "./Processing.css";

// ─── Config ────────────────────────────────────────────────────────────────────

const POLL_MS = 6000;

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

function timeSince(iso: string): string {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1)   return "À l'instant";
  if (m < 60)  return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `Il y a ${h}h`;
  return `Il y a ${Math.floor(h / 24)}j`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

// ─── Composant ─────────────────────────────────────────────────────────────────

function Processing() {
  const [tickets,   setTickets]   = useState<Ticket[]>([]);
  const [resolving, setResolving] = useState<Set<string>>(new Set());
  const [loading,   setLoading]   = useState<boolean>(true);
  const [toast,     setToast]     = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    try {
      const data: Ticket[] = await getMyTickets();
      setTickets(
        [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
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

  const handleResolve = async (ticket: Ticket) => {
    setResolving((s) => new Set([...s, ticket._id]));
    try {
      await resolveTicket(ticket._id);
      setTickets((prev: Ticket[]) => prev.filter((t) => t._id !== ticket._id));
      setToast(`✓ Ticket ${ticket.ticketNumber} résolu`);
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast("Erreur lors de la résolution.");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setResolving((s) => {
        const n = new Set(s);
        n.delete(ticket._id);
        return n;
      });
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="processing-page">
        <p className="processing-loading">Chargement des tickets…</p>
      </div>
    );
  }

  // ── Vide ────────────────────────────────────────────────────────────────────
  if (tickets.length === 0) {
    return (
      <div className="processing-page">
        <div className="processing-empty">
          <div className="processing-empty-icon">✦</div>
          <p>Aucun ticket à traiter pour le moment.</p>
        </div>
      </div>
    );
  }

  // ── Liste ────────────────────────────────────────────────────────────────────
  return (
    <div className="processing-page">
      {/* Header compteurs */}
      <div className="processing-header">
        <span className="processing-count">
          {tickets.length} ticket{tickets.length > 1 ? "s" : ""} assigné{tickets.length > 1 ? "s" : ""}
        </span>
        <div className="processing-chips">
          {(["critical", "high"] as TicketPriority[]).map((p) => {
            const count = tickets.filter((t: Ticket) => t.priority === p).length;
            if (count === 0) return null;
            return (
              <span
                key={p}
                className="processing-chip"
                style={{
                  color: PRIORITY_COLOR[p],
                  background: `${PRIORITY_COLOR[p]}18`,
                  borderColor: `${PRIORITY_COLOR[p]}30`,
                }}
              >
                {count} {PRIORITY_LABEL[p]}
              </span>
            );
          })}
        </div>
      </div>

      {/* Liste des tickets */}
      <div className="processing-list">
        {tickets.map((ticket: Ticket) => {
          const isResolving = resolving.has(ticket._id);
          return (
            <article
              key={ticket._id}
              className={`processing-card ${ticket.status === "in_progress" ? "active" : ""}`}
              style={{ borderTopColor: PRIORITY_COLOR[ticket.priority] }}
            >
              {isResolving && (
                <div className="processing-overlay">
                  <span>Résolution en cours…</span>
                </div>
              )}

              {/* Gauche */}
              <div className="processing-card-left">
                <div className="processing-ticket-num">{ticket.ticketNumber}</div>
                <h3 className="processing-topic">{ticket.subject}</h3>
                <p className="processing-desc">{ticket.description}</p>
                <div className="processing-meta">
                  <span
                    className="processing-priority"
                    style={{
                      color: PRIORITY_COLOR[ticket.priority],
                      background: `${PRIORITY_COLOR[ticket.priority]}18`,
                    }}
                  >
                    {PRIORITY_LABEL[ticket.priority]}
                  </span>
                  <span className="processing-time">{timeSince(ticket.createdAt)}</span>
                </div>
                <p className="processing-date">{formatDate(ticket.createdAt)}</p>
              </div>

              {/* Centre : créateur */}
              <div className="processing-card-center">
                <span className="processing-label">CUSTOMER</span>
                <div className="processing-avatar">
                  {getInitials(ticket.createdBy.firstName, ticket.createdBy.lastName)}
                </div>
                <p className="processing-name">
                  {ticket.createdBy.firstName} {ticket.createdBy.lastName}
                </p>
                <p className="processing-email">{ticket.createdBy.email}</p>
              </div>

              {/* Droite : action */}
              <div className="processing-card-right">
                <span className="processing-label">ACTION</span>
                <button
                  className="processing-resolve-btn"
                  onClick={() => handleResolve(ticket)}
                  disabled={isResolving}
                >
                  {isResolving ? "…" : "✓ Résolu"}
                </button>
                <span className="processing-status-badge">
                  {ticket.status === "in_progress" ? "En cours" : "Ouvert"}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {toast && <div className="processing-toast">{toast}</div>}
    </div>
  );
}

export default Processing;