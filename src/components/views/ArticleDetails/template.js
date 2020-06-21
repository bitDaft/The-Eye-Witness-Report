import React from "react";
import "./template.scss";

import Header from "components/layouts/Header";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class ArticleDetails extends React.Component {
  render() {
    let content = null;
    if (!this.props.article) {
      content = <Redirect to="/" />;
    } else {
      content = (
        <div className="content">
          <h1 className="title">{this.props.article.title}</h1>
          <p>{this.props.article.description}</p>
        </div>
      );
    }
    return (
      <div className="article-details">
        <Header onlyHeader={true} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  let allArticles = [];
  Object.keys(state.popular).forEach((key) => {
    allArticles.push(...state.popular[key].media);
    allArticles.push(...state.popular[key].no_media);
  });
  let article = allArticles.filter((article) => article.id === id)[0];
  return {
    article,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);

// export default ArticleDetails;
