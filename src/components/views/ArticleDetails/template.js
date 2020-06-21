import React from "react";
import "./template.scss";

import Header from "components/layouts/Header";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Footer from "components/layouts/Footer";

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

          <img src={this.props.article.img} />
          <p>{this.props.article.description}</p>
          <p>
            Read the rest of the story at{" "}
            <a href={this.props.article.url}>The New York Times</a>
          </p>
        </div>
      );
    }
    return (
      <div className="article-details">
        <Header onlyHeader={true} />
        {content}
        <Footer />
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

export default connect(mapStateToProps)(ArticleDetails);

// export default ArticleDetails;
