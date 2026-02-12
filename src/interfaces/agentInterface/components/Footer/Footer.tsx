import "./Footer.css";

function Footer() {
  return (
    <footer className="agent-footer">
      <div className="footer-left">
        <span>Q-MANAGER v1.0.0</span>
      </div>
      {/*<div className="footer-center">
        <a href="/" className="footer-link">En savoir plus</a>
        <a href="/" className="footer-link">Plus de produits</a>
      </div>*/}
      <div className="footer-right">
        <span className="footer-product">Product of ...</span>
      </div>
    </footer>
  );
}

export default Footer;
