import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getAllTicketsPublic } from "../../api/tickets";
import "./playerInterface.css";

interface Ticket {
  _id: string;
  numero: string;
  type: string;
  status: string;
  createdAt: string;
}

function PlayerInterface() {
  const navigate = useNavigate();
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [waitingTickets, setWaitingTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    loadTickets();
    const interval = setInterval(loadTickets, 5000); // Rafraîchir toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getAllTicketsPublic();
      
      const inProgress = data
        .filter((ticket) => ticket.status === "in_progress")
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      const waiting = data
        .filter((ticket) => ticket.status === "waiting")
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      setInProgressTickets(inProgress);
      setWaitingTickets(waiting);
    } catch (err) {
      console.error("Erreur lors du chargement des tickets", err);
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      depot: "Dépôt",
      retrait: "Retrait",
      creation: "Création",
    };
    return types[type] || type;
  };

  return (
    <div className="player-interface">
      <Button
        variant="link"
        className="back-link"
        onClick={() => navigate("/")}
      >
        ← Retour
      </Button>

      <div className="player-header">
        <h1 className="player-title">File d'attente</h1>
      </div>

      <div className="player-content">
        {/* Section En cours */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">En cours de traitement</h2>
          </div>
          <div className="section-body">
            {inProgressTickets.length === 0 ? (
              <div className="empty-state">Aucun ticket en cours</div>
            ) : (
              <div className="tickets-display">
                {inProgressTickets.map((ticket) => (
                  <div key={ticket._id} className="ticket-display-card">
                    <div className="ticket-display-number">{ticket.numero}</div>
                    <div className="ticket-display-type">{getTypeLabel(ticket.type)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Section En attente */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">En attente</h2>
          </div>
          <div className="section-body">
            {waitingTickets.length === 0 ? (
              <div className="empty-state">Aucun ticket en attente</div>
            ) : (
              <div className="tickets-display">
                {waitingTickets.map((ticket) => (
                  <div key={ticket._id} className="ticket-display-card">
                    <div className="ticket-display-number">{ticket.numero}</div>
                    <div className="ticket-display-type">{getTypeLabel(ticket.type)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerInterface;
