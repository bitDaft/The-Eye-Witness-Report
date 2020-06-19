import React from 'react';
import './template.scss';

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class BasicNewsSection extends React.Component {
  render (){
    return (
      <div className="basic-news-section">
        <h1><span>{this.props.title}</span></h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BasicNewsSection;
