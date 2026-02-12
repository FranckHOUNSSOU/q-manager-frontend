import "./Dashboard.css";
import { Card } from "react-bootstrap";
import { BookFill, PeopleFill, PersonBadgeFill } from "react-bootstrap-icons";

const WIDGETS = [
  {
    label: "Étudiants actifs",
    value: "1,245",
    icon: <PeopleFill size={28} />,
    color: "primary",
  },
  {
    label: "Cours disponibles",
    value: "48",
    icon: <BookFill size={28} />,
    color: "success",
  },
  {
    label: "Formateurs",
    value: "32",
    icon: <PersonBadgeFill size={28} />,
    color: "warning",
  },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="row g-4">
        {WIDGETS.map((widget, idx) => (
          <div className="col-lg-4 col-md-6 col-12" key={idx}>
            <Card className="stat-card">
              <Card.Body className="stat-card-body">
                <div className={`stat-icon-wrapper ${widget.color}`}>
                  {widget.icon}
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{widget.value}</h3>
                  <p className="stat-label">{widget.label}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
