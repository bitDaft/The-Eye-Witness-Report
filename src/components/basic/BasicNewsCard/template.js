import React from "react";
import "./template.scss";

function BasicNewsCard(props) {
  let classes = "basic-news-card ";
  let text_classes = "text ";
  if (props.noImage === true) {
    classes += "no-image ";
  }
  if (props.horizontal === true) {
    classes += "horz ";
  }
  if (props.article.description.trim()) {
    text_classes += "fade ";
  }
  if (!props.article.img.trim()) {
    text_classes += "white-fade ";
  }
  return (
    <div className={classes}>
      <div>
        <div className="img">
          <img src={props.article.img} alt={props.article.imgcaption} />
        </div>
        <div className={text_classes}>
          <h1>{props.article.title}</h1>
          <p>{props.article.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BasicNewsCard;
