import { useState, useEffect } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { TicketFill, CashCoin, Wallet2, PersonPlusFill } from "react-bootstrap-icons";
import { createTicket } from "../../api/tickets";
import "./ticketInterface.css";

function TicketInterface() {
  const navigate = useNavigate();
  const [ticketNumber, setTicketNumber] = useState("");
  const [operationType, setOperationType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    generateTicketNumber();
  }, []);

  const generateTicketNumber = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("ticketDate");
    let counter = parseInt(localStorage.getItem("ticketCounter") || "0");

    // Réinitialiser le compteur si on est un nouveau jour
    if (storedDate !== today) {
      counter = 0;
      localStorage.setItem("ticketDate", today);
    }

    // Incrémenter le compteur
    counter++;
    localStorage.setItem("ticketCounter", counter.toString());

    // Calculer la lettre et le numéro
    const letterIndex = Math.floor((counter - 1) / 1000);
    const number = ((counter - 1) % 1000);
    
    // Si on dépasse Z999, recommencer à A000
    const letter = String.fromCharCode(65 + (letterIndex % 26)); // A-Z
    const formattedNumber = number.toString().padStart(3, "0");
    
    setTicketNumber(`${letter}${formattedNumber}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await createTicket(ticketNumber, operationType);
      setMessage({ text: "Ticket créé avec succès!", type: "success" });
      
      // Générer un nouveau ticket après soumission
      setTimeout(() => {
        setOperationType("");
        setMessage(null);
        generateTicketNumber();
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erreur lors de la création du ticket";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-interface">
      <Button
        variant="link"
        className="back-link"
        onClick={() => navigate("/")}
      >
        ← Retour à l'accueil
      </Button>

      <Card className="ticket-card">
        <Card.Body>
          <div className="ticket-header">
            <div className="ticket-icon-wrapper">
              <TicketFill size={32} />
            </div>
            <h2 className="ticket-title">Nouveau Ticket</h2>
            <p className="ticket-subtitle">Sélectionnez le type d'opération</p>
          </div>

          {message && (
            <Alert variant={message.type === "success" ? "success" : "danger"} className="mb-3">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="ticket-number-display">
              <label className="ticket-number-label">Numéro de ticket</label>
              <div className="ticket-number">{ticketNumber}</div>
            </div>

            <Form.Group className="mb-0">
              <Form.Label className="form-label-custom">Type d'opération</Form.Label>
              <div className="operation-buttons">
                <button
                  type="button"
                  className={`operation-btn ${operationType === "depot" ? "active" : ""}`}
                  onClick={() => setOperationType("depot")}
                  disabled={loading}
                >
                  <CashCoin size={32} className="operation-icon" />
                  <span>Dépôt</span>
                </button>
                <button
                  type="button"
                  className={`operation-btn ${operationType === "retrait" ? "active" : ""}`}
                  onClick={() => setOperationType("retrait")}
                  disabled={loading}
                >
                  <Wallet2 size={32} className="operation-icon" />
                  <span>Retrait</span>
                </button>
                <button
                  type="button"
                  className={`operation-btn ${operationType === "creation" ? "active" : ""}`}
                  onClick={() => setOperationType("creation")}
                  disabled={loading}
                >
                  <PersonPlusFill size={32} className="operation-icon" />
                  <span>Création de compte</span>
                </button>
              </div>
            </Form.Group>

            <Button
              type="submit"
              className="submit-btn"
              disabled={!operationType || loading}
            >
              {loading ? "Génération..." : "Générer le ticket"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TicketInterface;
