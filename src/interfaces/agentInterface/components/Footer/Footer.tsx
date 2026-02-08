import "./Footer.css";

function Footer() {
  return (
    <footer className="agent-footer">
      <div className="footer-left">
        <a href="/" className="footer-link">Q-MANAGER v3.0.0 2026</a>
      </div>
      <div className="footer-center">
        <a href="/" className="footer-link">En savoir plus</a>
        <a href="/" className="footer-link">Plus de produits</a>
      </div>
      <div className="footer-right">
        <span className="footer-product">Un produit Q-MANAGER</span>
      </div>
    </footer>
  );
}

export default Footer;
