import React from "react";
import "./template.scss";

import Header from "components/layouts/Header";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { handleSearchProper, toggleSearch, handleSearch } from "store/actions";

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
          <div className="back">
            <Link to="/" className="backLink">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
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
