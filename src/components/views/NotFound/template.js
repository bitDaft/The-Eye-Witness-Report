import React from "react";
import "./template.scss";

import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

import { Redirect, Link } from "react-router-dom";

class TemplateClassComponent extends React.Component {
  render() {
    return (
      <div className="not-found">
        <Header onlyHeader={true} />
        <div className="content">
          404 Page not Found
          <Link to="/home" >Go Back</Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TemplateClassComponent;
