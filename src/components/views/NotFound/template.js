import React from "react";
import "./template.scss";

import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <Header onlyHeader={true} />
      <div className="content">
        404 Page not Found
        <Link to="/home">Go Back</Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
