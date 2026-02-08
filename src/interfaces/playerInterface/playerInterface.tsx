import React from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./playerInterface.css";

function PlayerInterface() {
  const navigate = useNavigate();

  return (
    <Container fluid className="player-interface vh-100 d-flex flex-column align-items-center justify-content-center">
      <Button
        variant="link"
        className="back-link mb-3"
        onClick={() => navigate("/")}
      >
        ← Retour à l'accueil
      </Button>
      <h1 className="mb-4">Interface Player</h1>
      <p className="text-muted">Espace dédié au lecteur / affichage des files d'attente.</p>
    </Container>
  );
}

export default PlayerInterface;
