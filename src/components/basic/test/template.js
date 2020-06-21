import React from "react";
import "./template.scss";
import Header from "components/layouts/Header";
import ArticleDetail from 'components/views/ArticleDetails'


class Test extends React.Component {
  render() {
    return (
      <div className="test">
        <ArticleDetail />
      </div>
    );
  }
}

export default Test;
