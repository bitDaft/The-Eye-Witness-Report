import React from "react";
import "./template.scss";

import BasicNewsCard from "components/basic/BasicNewsCard";

import logo from "assets/images/logo.svg";

class Test extends React.Component {
  article = {
    img: "https://static01.nyt.com/images/2020/06/17/us/politics/17dc-bolton/17dc-bolton-threeByTwoSmallAt2X.jpg?quality=75&auto=webp&disable=upscale&width=400",
    title:
      "Memoir Accuses President of Seeking China’s Help to Win Re-Election",
    description:
      "In his new book, John Bolton, the former national security adviser, describes episodes where President Trump sought to halt criminal inquiries.",
  };

  render() {
    return (
      <div className="test">
        <BasicNewsCard article={this.article} />
      </div>
    );
  }
}

export default Test;
