import { useState } from "react";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, saveTokens, saveUser } from "../../api/auth";
import { AxiosError } from "axios";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email || !password) {
      setMessage({ text: "Veuillez remplir l'email et le mot de passe.", type: "error" });
      return;
    }

    try {
      const response = await apiLogin(email, password);
      saveTokens(response.access_token, response.refresh_token);
      saveUser(response.user);
      setMessage({ text: "Connexion réussie. Redirection...", type: "success" });
      navigate("/agentInterface");
    } catch (err) {
      let text = "Échec de la connexion. Vérifiez vos identifiants.";
      if (err instanceof AxiosError) {
        if (err.code === "ERR_NETWORK" || !err.response) {
          text =
            "Impossible de joindre le serveur. Démarrez le backend (q-manager-backend) sur le port 3000.";
        } else if (err.response?.data?.message) {
          text = String(err.response.data.message);
        }
      }
      setMessage({ text, type: "error" });
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light p-0 m-0">
      <Row className="w-100 h-100 shadow-lg rounded overflow-hidden bg-white">
        <Col className="align-items-center p-5 h-100">
          <div className="mb-4 text-end">
            <small>Vous n'avez pas de compte ? </small>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => navigate("/signUp")}
            >
              S'inscrire
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
            <FloatingLabel label="Mot de passe">
              <Form.Control
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
              />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3">
              Se connecter
            </Button>
          </Form>
        </Col>

        <Col className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5 h-100" style={{ background: "#4A6FA5 "}}>
          <h2>Bienvenue </h2>
          <p>Pour commencer, connectez-vous à votre compte</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
