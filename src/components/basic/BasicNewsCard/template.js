import React from "react";
import "./template.scss";

function BasicNewsCard(props) {
  let classes = "basic-news-card ";
  if(props.noImage === true) {
    classes += "no-image "
  }
  if(props.horizontal === true) {
    classes += "horz "
  }
  return (
    <div className={classes}>
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
