import React from "react";
import "./template.scss";

function BasicNewsCard(props) {
  return (
    <div className="basic-news-card">
      <a href="#">
        <div className="img">
          <img src={props.article.img} />
        </div>
        <div className="text">
          <h1>{props.article.title}</h1>
          <p>{props.article.description.slice(0, 90)}</p>
        </div>
      </a>
    </div>
  );
}

export default BasicNewsCard;
