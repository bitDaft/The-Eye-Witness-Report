import React from "react";
import "./template.scss";

function Footer(props) {
  return (
    <div className="footer">
      <div className="content">
        <div>
          <img
            src="https://developer.nytimes.com/files/poweredby_nytimes_200c.png?v=1568441068934"
            alt="Data by New York Times"
          />
        </div>
        <h1>The Eye Witness Report</h1>
        <p>Showing the most popular articles from The New York Times.</p>
        <p>
          Made with <i className="fas fa-heart heart" /> and{" "}
          <i className="fab fa-react react" />
        </p>
      </div>
    </div>
  );
}

export default Footer;
