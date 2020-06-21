import React from "react";
import "./template.scss";

import StandardNewsCard from "components/basic/StandardNewsCard";
import BasicNewsCard from "components/basic/BasicNewsCard";
import BasicNewsSection from "components/basic/BasicNewsSection";
import SearchTopics from "components/basic/SearchTopics";

import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { getPopularArticles, getSearchArticles } from "store/actions";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.isSearchOpen) {
      this.props.getSearchArticles(this.props.searchValue);
    } else {
      this.props.getPopularArticles(this.props.currentPeriod);
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="content">
          <SearchTopics />
          <br />
          {this.props.loading ? (
            <div className="loading"></div>
          ) : (
            Object.keys(this.props.popular).map((section_title) => {
              return (
                <BasicNewsSection
                  key={section_title}
                  title={section_title}
                  media={this.props.popular[section_title].media.map(
                    (article) => {
                      return (
                        <Link
                          to={"/details/" + article.id}
                          className="card-link"
                        >
                          <StandardNewsCard
                            article={article}
                            key={article.id}
                          />
                        </Link>
                      );
                    }
                  )}
                  no_media={this.props.popular[section_title].no_media.map(
                    (article) => {
                      return (
                        <Link
                          to={"/details/" + article.id}
                          className="card-link"
                        >
                          <BasicNewsCard
                            noImage={true}
                            horizontal={true}
                            article={article}
                            key={article.id}
                          />
                        </Link>
                      );
                    }
                  )}
                />
              );
            })
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    popular: state.popular,
    currentPeriod: state.currentPeriod.period,
    isSearchOpen: state.isSearchOpen,
    searchValue: state.search,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPopularArticles: (currentPeriod) => {
      dispatch(getPopularArticles(currentPeriod));
    },
    getSearchArticles: (text) => {
      dispatch(getSearchArticles(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
