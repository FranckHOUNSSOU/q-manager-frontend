import React from "react";
import "./SignUp.css";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp() {
    const navigate = useNavigate();
      const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };
    return (
    <Container fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light p-0 m-0"
    >
      <Row className="w-100 h-100 shadow-lg rounded overflow-hidden bg-white">

        <Col
          className="d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-5 h-100"
        >
          <h2>Bienvenue Q-MANAGER</h2>
          <p>Pour commencer, créez votre compte</p>
        </Col>


        <Col  className="align-items-center p-3 h-100">
          <div className="mb-4 text-end">
            <small>Vous avez déjà un compte ? </small>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/")}
            >
              Se connecter
            </Button>
          </div>
          <Form onSubmit={onSubmit}>
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control type="email" placeholder="Entrez votre email" />
            </FloatingLabel>
            <FloatingLabel label="Nom" className="mb-1">
              <Form.Control type="text" placeholder="Nom" />
            </FloatingLabel>
            <FloatingLabel label="Prénom" className="mb-1">
              <Form.Control type="text" placeholder="Prénom" />
            </FloatingLabel>
            <FloatingLabel label="Téléphone" className="mb-3">
              <Form.Control type="text" placeholder="Téléphone" />
            </FloatingLabel>
            <FloatingLabel label="Mot de passe" className="mb-3">
              <Form.Control type="password" placeholder="Entrez votre mot de passe" />
            </FloatingLabel>
            <FloatingLabel label="Confirmer le mot de passe" className="mb-4">
              <Form.Control type="password" placeholder="Confirmez votre mot de passe" />
            </FloatingLabel>
            <Button variant="success" type="submit" className="mt-2">
              S'inscrire
            </Button>
          </Form>
        </Col>

        
      </Row>
    </Container>
    );
};
export default SignUp;


