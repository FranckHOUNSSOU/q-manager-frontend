import { useState, useEffect } from "react";
import "./Profil.css";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { 
  PersonFill, 
  EnvelopeFill, 
  TelephoneFill, 
  ShieldFill,
  CalendarFill 
} from "react-bootstrap-icons";
import { getUser } from "../../../../api/auth";

function Profil() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="profil-page">
        <div className="text-center py-5">
          <p className="text-muted">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profil-page">
      <div className="profil-header">
        <h2 className="profil-title">Mon Profil</h2>
        <p className="profil-subtitle">Informations de votre compte</p>
      </div>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="profil-card profile-summary">
            <Card.Body className="text-center">
              <div className="profile-avatar">
                <PersonFill size={60} />
              </div>
              <h3 className="profile-name">
                {user.firstName} {user.lastName}
              </h3>
              <Badge 
                bg={user.role === "admin" ? "danger" : "primary"} 
                className="profile-role-badge"
              >
                {user.role === "admin" ? "Administrateur" : "Agent"}
              </Badge>
              <p className="profile-email">{user.email}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="profil-card">
            <Card.Body>
              <h4 className="section-title">Informations personnelles</h4>
              
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">
                    <PersonFill size={20} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Nom complet</label>
                    <p className="info-value">{user.firstName} {user.lastName}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <EnvelopeFill size={20} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Email</label>
                    <p className="info-value">{user.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <TelephoneFill size={20} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Téléphone</label>
                    <p className="info-value">{user.phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <ShieldFill size={20} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Rôle</label>
                    <p className="info-value">
                      {user.role === "admin" ? "Administrateur" : "Agent"}
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <CalendarFill size={20} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Identifiant</label>
                    <p className="info-value">{user.id}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profil;
