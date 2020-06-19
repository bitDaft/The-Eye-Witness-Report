import React from "react";
import "./template.scss";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class BasicNewsSection extends React.Component {
  render() {
    return (
      <div className="basic-news-section">
        <h1>
          <span>{this.props.title}</span>
        </h1>
        <div className="content">
          <ul>
            {this.props.media.map((item) => (
              <li key={item.key}>{item}</li>
            ))}
          </ul>
          <ul>
            {this.props.no_media.map((item) => (
              <li key={item.key}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BasicNewsSection;
