import React from 'react';
import './template.scss';

import BasicNewsCard from "components/basic/BasicNewsCard";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class StandardNewsCard extends React.Component {
  render (){
    return (
      <div className="standard-news-card">
        <BasicNewsCard article={this.props.article} noImage={this.props.noImage} horizontal={this.props.horizontal} />
      </div>
    );
  }
}

export default StandardNewsCard;
