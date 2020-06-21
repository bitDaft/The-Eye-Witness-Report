import React from "react";
import "./template.scss";

function BasicNewsSection(props) {
  return (
    <div className="basic-news-section">
      <h1>
        <span>{props.title}</span>
      </h1>
      <div className="content">
        <ul>
          {props.media.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </ul>
        <ul>
          {props.no_media.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BasicNewsSection;
