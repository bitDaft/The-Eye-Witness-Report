import React from "react";
import "./template.scss";
import Header from "components/layouts/Header";

class Test extends React.Component {
  render() {
    return (
      <div className="test">
        <Header onlyHeader={true}/>
      </div>
    );
  }
}

export default Test;
