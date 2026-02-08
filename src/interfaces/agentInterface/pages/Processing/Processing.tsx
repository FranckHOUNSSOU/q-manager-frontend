import "./Processing.css";

const CARDS = [
  {
    id: 1,
    topic: "Mathematic",
    date: "16 mai 2025 11:28-11:43 (NaN jours)",
    providerInitials: "TA",
    providerName: "Theophas AFOMASSE",
    customerInitials: "WA",
    customerName: "Waninsou Enagnintan Pinite Théophas AFOMASSE",
    active: false,
  },
  {
    id: 2,
    topic: "Physique",
    date: "16 mai 2025 14:00-14:30 (NaN jours)",
    providerInitials: "TA",
    providerName: "Theophas AFOMASSE",
    customerInitials: "JD",
    customerName: "Jean Dupont",
    active: true,
  },
  {
    id: 3,
    topic: "Chimie",
    date: "17 mai 2025 09:15-09:45 (NaN jours)",
    providerInitials: "MB",
    providerName: "Marie Bernard",
    customerInitials: "AL",
    customerName: "Anne Martin",
    active: false,
  },
];

function Processing() {
  return (
    <div className="processing-page">
      <div className="processing-list">
        {CARDS.map((card) => (
          <article
            key={card.id}
            className={`processing-card ${card.active ? "active" : ""}`}
          >
            <div className="processing-card-left">
              <h3 className="processing-topic">{card.topic}</h3>
              <p className="processing-date">{card.date}</p>
            </div>
            <div className="processing-card-center">
              <span className="processing-label">SERVICE PROVIDER</span>
              <div className="processing-avatar">{card.providerInitials}</div>
              <p className="processing-name">{card.providerName}</p>
            </div>
            <div className="processing-card-right">
              <span className="processing-label">CUSTOMER</span>
              <div className="processing-avatar">{card.customerInitials}</div>
              <p className="processing-name">{card.customerName}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Processing;
