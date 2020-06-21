import React from "react";
import "./template.scss";

import BasicNewsCard from "components/basic/BasicNewsCard";

function StandardNewsCard(props) {
  return (
    <div className="standard-news-card">
      <BasicNewsCard {...props} />
    </div>
  );
}

export default StandardNewsCard;
