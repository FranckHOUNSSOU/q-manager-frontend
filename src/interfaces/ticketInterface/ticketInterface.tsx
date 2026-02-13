import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ticketInterface.css";
import { createTicket } from "../../api/ticketApi";
import type { TicketPriority } from "../../api/ticketApi";

// ─── Config priorités ──────────────────────────────────────────────────────────

const PRIORITIES: { value: TicketPriority; label: string; color: string; icon: string }[] = [
  { value: "low",      label: "Faible",   color: "#22c55e", icon: "▽" },
  { value: "medium",   label: "Moyen",    color: "#f59e0b", icon: "◈" },
  { value: "high",     label: "Élevé",    color: "#f97316", icon: "△" },
  { value: "critical", label: "Critique", color: "#ef4444", icon: "⬡" },
];

// ─── Composant ─────────────────────────────────────────────────────────────────

function TicketInterface() {
  const navigate = useNavigate();

  const [subject,     setSubject]     = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority,    setPriority]    = useState<TicketPriority>("medium");
  const [submitting,  setSubmitting]  = useState<boolean>(false);
  const [error,       setError]       = useState<string>("");
  const [success,     setSuccess]     = useState<{ ticketNumber: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!subject.trim())     { setError("Le sujet est requis.");        return; }
    if (!description.trim()) { setError("La description est requise."); return; }

    setSubmitting(true);
    try {
      const ticket = await createTicket({
        subject:     subject.trim(),
        description: description.trim(),
        priority,
      });
      setSuccess({ ticketNumber: ticket.ticketNumber });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || "Erreur lors de la création du ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubject(""); setDescription(""); setPriority("medium");
    setSuccess(null); setError("");
  };

  // ── Écran succès ────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="ti-page">
        <button className="ti-back" onClick={() => navigate("/")}>← Retour à l'accueil</button>
        <div className="ti-card">
          <div className="ti-success">
            <div className="ti-success-icon">✦</div>
            <h2>Ticket créé avec succès !</h2>
            <div className="ti-ticket-num">{success.ticketNumber}</div>
            <p className="ti-success-sub">Le ticket est maintenant visible dans le Player.</p>
            <button className="ti-reset-btn" onClick={handleReset}>+ Créer un nouveau ticket</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Formulaire ──────────────────────────────────────────────────────────────
  return (
    <div className="ti-page">
      <button className="ti-back" onClick={() => navigate("/")}>← Retour à l'accueil</button>

      <div className="ti-card">
        <div className="ti-header">
          <span className="ti-badge">◈ Distributeur</span>
          <h1 className="ti-title">Nouveau ticket</h1>
          <p className="ti-subtitle">Soumettez votre demande de support technique.</p>
        </div>

        <div className="ti-divider" />

        <form onSubmit={handleSubmit} noValidate>

          {/* Sujet */}
          <div className="ti-field">
            <label className="ti-label">Sujet *</label>
            <input
              className="ti-input"
              type="text"
              placeholder="Ex : Problème de connexion réseau"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
            />
          </div>

          {/* Description */}
          <div className="ti-field">
            <label className="ti-label">Description *</label>
            <textarea
              className="ti-textarea"
              placeholder="Décrivez le problème en détail…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={4}
            />
          </div>

          {/* Priorité */}
          <div className="ti-field">
            <label className="ti-label">Priorité</label>
            <div className="ti-priority-grid">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`ti-priority-btn ${priority === p.value ? "selected" : ""}`}
                  style={
                    priority === p.value
                      ? { borderColor: p.color, color: p.color, background: `${p.color}18` }
                      : {}
                  }
                  onClick={() => setPriority(p.value)}
                >
                  <span className="ti-priority-icon">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Erreur */}
          {error && <p className="ti-error">⚠ {error}</p>}

          {/* Submit */}
          <button type="submit" className="ti-submit" disabled={submitting}>
            {submitting ? "Création en cours…" : "Créer le ticket →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default TicketInterface;