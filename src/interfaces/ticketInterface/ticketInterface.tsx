import React from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./ticketInterface.css";

function TicketInterface() {
  const navigate = useNavigate();

  return (
    <Container fluid className="ticket-interface vh-100 d-flex flex-column align-items-center justify-content-center">
      <Button
        variant="link"
        className="back-link mb-3"
        onClick={() => navigate("/")}
      >
        ← Retour à l'accueil
      </Button>
      <h1 className="mb-4">Interface Distributeur (Tickets)</h1>
      <p className="text-muted">Espace de distribution des tickets / prise de numéro.</p>
    </Container>
  );
}

export default TicketInterface;
