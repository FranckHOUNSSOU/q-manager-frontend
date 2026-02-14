import { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { getMyActiveTickets, updateTicketStatus } from "../../../../api/tickets";
import "./Processing.css";

interface Ticket {
  _id: string;
  numero: string;
  type: string;
  status: string;
  createdAt: string;
}

function Processing() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await getMyActiveTickets();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des tickets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId: string, status: string) => {
    try {
      await updateTicketStatus(ticketId, status);
      loadTickets();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut", err);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      waiting: { bg: "secondary", text: "En attente" },
      in_progress: { bg: "primary", text: "En cours" },
      completed: { bg: "success", text: "Terminé" },
      cancelled: { bg: "danger", text: "Annulé" },
    };
    const config = statusConfig[status] || statusConfig.waiting;
    return <Badge bg={config.bg}>{config.text}</Badge>;
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      depot: "Dépôt",
      retrait: "Retrait",
      creation: "Création de compte",
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="processing-page">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="processing-page">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="processing-page">
      <div className="processing-header">
        <h2 className="processing-title">Mes Tickets</h2>
        <p className="processing-subtitle">Gérez vos tickets assignés</p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Aucun ticket assigné</p>
        </div>
      ) : (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <Card key={ticket._id} className="ticket-card">
              <Card.Body>
                <div className="ticket-header-row">
                  <div>
                    <h3 className="ticket-number">{ticket.numero}</h3>
                    <p className="ticket-type">{getTypeLabel(ticket.type)}</p>
                  </div>
                  <div>{getStatusBadge(ticket.status)}</div>
                </div>

                <div className="ticket-date">
                  Créé le {new Date(ticket.createdAt).toLocaleString("fr-FR")}
                </div>

                <div className="ticket-actions">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleStatusChange(ticket._id, "in_progress")}
                    disabled={ticket.status !== "waiting"}
                  >
                    En cours
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleStatusChange(ticket._id, "completed")}
                    disabled={ticket.status === "completed" || ticket.status === "cancelled"}
                  >
                    Terminé
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleStatusChange(ticket._id, "cancelled")}
                    disabled={ticket.status === "completed" || ticket.status === "cancelled"}
                  >
                    Annuler
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Processing;
