import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <Container fluid className="home-page vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="home-logo-wrapper mb-5">
        <img src="/insigne.png" alt="Q-Manager Logo" className="home-logo" />
        <h1 className="home-title">Q-Manager</h1>
      </div>
      
      <Row className="w-100 justify-content-center g-4">
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            size="lg"
            className="home-btn"
            onClick={() => navigate("/playerInterface")}
          >
            Player
          </Button>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <Button
            variant="outline-success"
            size="lg"
            className="home-btn"
            onClick={() => navigate("/login")}
          >
            Agent
          </Button>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <Button
            variant="outline-warning"
            size="lg"
            className="home-btn"
            onClick={() => navigate("/ticketInterface")}
          >
            Distributeur
          </Button>
        </Col>
        <Col xs={12} className="text-center mt-4">
          <p className="home-subtitle">Choisissez votre interface</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
