import { useState } from "react";
import "./AddAgent.css";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { register as apiRegister } from "../../../../../api/auth";
import { AxiosError } from "axios";

function AddAgent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();
    const firstName = (formData.get("firstName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const password = formData.get("password") as string;
    const roleDisplay = formData.get("role") as string;

    if (!email || !lastName || !firstName || !phone || !password || !roleDisplay) {
      setMessage({ text: "Tous les champs sont requis.", type: "error" });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: "Le mot de passe doit contenir au moins 6 caractères.", type: "error" });
      return;
    }

    const role = roleDisplay === "admin" ? "admin" : "user";

    try {
      await apiRegister({
        email,
        lastName,
        firstName,
        phone,
        password,
        role,
      });
      setMessage({ text: "Agent ajouté avec succès.", type: "success" });
      setTimeout(() => navigate("/agentInterface/staff"), 1500);
    } catch (err) {
      let text =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : "Échec de l'ajout. Vérifiez les champs ou la connexion au serveur.";
      if (err instanceof AxiosError && (err.code === "ERR_NETWORK" || !err.response)) {
        text = "Impossible de joindre le serveur. Démarrez le backend sur le port 3000.";
      }
      setMessage({ text, type: "error" });
    }
  };

  return (
    <div className="add-agent-page">
      <div className="add-agent-header">
        <h2 className="add-agent-title">Ajouter un agent</h2>
        <p className="add-agent-subtitle">Remplissez les informations de l'agent</p>
      </div>

      <Card className="add-agent-card">
        <Card.Body>
          {message && (
            <div className={`alert-message alert-${message.type}`} role="alert">
              <span>{message.text}</span>
              <button
                type="button"
                className="alert-close"
                onClick={() => setMessage(null)}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
          )}

          <Form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder=""
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Prénoms</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder=""
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder=""
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="+229 01 XX XX XX XX"
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Rôle</Form.Label>
                  <Form.Select name="role" required>
                    <option value="">Sélectionner un rôle</option>
                    <option value="user">Agent</option>
                    <option value="admin">Administrateur</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=""
                    minLength={6}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={() => navigate("/agentInterface/staff")}
              >
                Annuler
              </Button>
              <Button variant="primary" type="submit" className="btn-save">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddAgent;
