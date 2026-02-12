import { useState } from "react";
import "./SignUp.css";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { register as apiRegister, saveTokens, saveUser } from "../../api/auth";
import { AxiosError } from "axios";

function SignUp() {
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
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email || !lastName || !firstName || !phone || !password) {
      setMessage({ text: "Tous les champs sont requis.", type: "error" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: "Les mots de passe ne correspondent pas.", type: "error" });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: "Le mot de passe doit contenir au moins 6 caractères.", type: "error" });
      return;
    }

    try {
      const response = await apiRegister({
        email,
        lastName,
        firstName,
        phone,
        password,
      });
      saveTokens(response.access_token, response.refresh_token);
      saveUser(response.user);
      setMessage({ text: "Inscription réussie. Redirection...", type: "success" });
      navigate("/agentInterface");
    } catch (err) {
      let text =
        err instanceof AxiosError && err.response?.data?.message
          ? String(err.response.data.message)
          : "Échec de l'inscription. Vérifiez les champs ou la connexion au serveur.";
      if (err instanceof AxiosError && (err.code === "ERR_NETWORK" || !err.response)) {
        text = "Impossible de joindre le serveur. Démarrez le backend sur le port 3000.";
      }
      setMessage({ text, type: "error" });
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light p-0 m-0">
      <Row className="w-100 h-100 shadow-lg rounded overflow-hidden bg-white">
        <Col className="d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-5 h-100">
          <h2>Bienvenue Q-MANAGER</h2>
          <p>Pour commencer, créez votre compte</p>
        </Col>

        <Col className="align-items-center p-3 h-100">
          <div className="mb-4 text-end">
            <small>Vous avez déjà un compte ? </small>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </Button>
          </div>
          {message && (
            <div
              className={`auth-message auth-message--${message.type}`}
              role="alert"
            >
              <span>{message.text}</span>
              <button
                type="button"
                className="auth-message__close"
                onClick={() => setMessage(null)}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
          )}
          <Form onSubmit={onSubmit}>
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre email"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Nom" className="mb-1">
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Nom"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Prénom" className="mb-1">
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Prénom"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Téléphone" className="mb-3">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Téléphone"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Mot de passe" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                minLength={6}
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Confirmer le mot de passe" className="mb-4">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </FloatingLabel>
            <Button variant="success" type="submit" className="mt-2">
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
