import React from "react";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Login (){
	const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/agentInterface');
  };

	return (
    <Container fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light p-0 m-0"
    >
      <Row className="w-100 h-100 shadow-lg rounded overflow-hidden bg-white">
        <Col  className="align-items-center p-5 h-100">
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
          <Form onSubmit={onSubmit}>
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control type="email" placeholder="Entrez votre email" />
            </FloatingLabel>
            <FloatingLabel label="Mot de passe">
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
              />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3">
              Se connecter
            </Button>
          </Form>
        </Col>

        <Col
          className="d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-5 h-100"
        >
          <h2>Bienvenue Q-MANAGER</h2>
          <p>Pour commencer, connecter-vous à votre compte</p>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;

