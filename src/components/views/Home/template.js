import React from "react";
import "./template.scss";

import StandardNewsCard from "components/basic/StandardNewsCard";
import BasicNewsCard from "components/basic/BasicNewsCard";
import BasicNewsSection from "components/basic/BasicNewsSection";
import SearchTopics from "components/basic/SearchTopics";

import Header from "components/layouts/Header";

import config from "config";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class TemplateClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.config = config[config.env];
    this.timer = 0;
    this.times = [
      {
        period: 1,
        text: "Today",
      },
      {
        period: 7,
        text: "Last 7 day",
      },
      {
        period: 30,
        text: "Last 30 day",
      },
    ];
    this.state = {
      period: this.times[0],
      home: [],
      popular: {},
      search: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.getHome();
    this.setState({ home: this.getHome() });
  };

  search = () => {
    fetch(
      `${this.config.base_url}/${this.config.search_endpoint}?q=${this.state.search}&fq=source:("The New York Times")&api-key=${this.config.api_key}`
    )
      .then((res) => res.json())
      .then((data) => data.response.docs)
      .then((articles) => {
        let formatted_articles = {};
        articles.forEach((article) => {
          let formatted_article = {
            id: article._id,
            title: article.headline.main,
            description: article.abstract,
            img: !article.multimedia.filter(
              (media) => media.subtype === "mediumThreeByTwo440"
            ).length
              ? ""
              : "https://static01.nyt.com/" +
                article.multimedia.filter(
                  (media) => media.subtype === "mediumThreeByTwo440"
                )[0].url,
            imgcaption: "",
          };
          if (!formatted_articles.hasOwnProperty(article.section_name)) {
            formatted_articles[article.section_name] = {
              media: [],
              no_media: [],
            };
          }
          if (
            !article.multimedia.filter(
              (media) => media.subtype === "mediumThreeByTwo440"
            ).length
          )
            formatted_articles[article.section_name].no_media.push(
              formatted_article
            );
          else
            formatted_articles[article.section_name].media.push(
              formatted_article
            );
        });
        this.setState({
          popular: formatted_articles,
          loading: false,
        });
      });
  };
  getHome = () => {
    fetch(
      `${this.config.base_url}/${this.config.most_popular_endpoint}/viewed/${this.state.period.period}.json?api-key=${this.config.api_key}`
    )
      .then((res) => res.json())
      .then((data) => data.results)
      .then((articles) => {
        let formatted_articles = {};
        articles.forEach((article) => {
          let formatted_article = {
            id: article.id,
            title: article.title,
            description: article.abstract,
            img: !article.media.length
              ? ""
              : article.media[0]["media-metadata"].reverse()[0].url,
            imgcaption: !article.media.length ? "" : article.media[0].caption,
          };
          if (!formatted_articles.hasOwnProperty(article.section)) {
            formatted_articles[article.section] = {
              media: [],
              no_media: [],
            };
          }
          if (!article.media.length)
            formatted_articles[article.section].no_media.push(
              formatted_article
            );
          else
            formatted_articles[article.section].media.push(formatted_article);
        });
        this.setState({
          popular: formatted_articles,
          loading: false,
        });
      });
  };
  handleSearch = (e) => {
    if (this.state.search === e.target.value) {
      return;
    }
    this.setState(
      {
        [e.target.name]: e.target.value.trim(),
        loading: true,
      },
      () => {
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
          if (this.state.search) {
            this.search();
          } else {
            this.getHome();
          }
        }, 500);
      }
    );
  };

  handleSelect = (e) => {
    let value = this.times.filter((_) => +_.period === +e.target.value)[0];
    if (this.state.period.period === value.period) {
      return;
    }
    this.setState(
      {
        [e.target.name]: value,
        loading: true,
        search: "",
      },
      () => {
        this.getHome();
      }
    );
  };

  render() {
    return (
      <div className="home">
        <Header
          text={this.state.period.text}
          periods={this.times}
          name="period"
          onChange={this.handleSelect}
          value={this.state.period.period}
        />
        <div className="content">
          <SearchTopics
            value={this.state.search}
            onChange={this.handleSearch}
            name="search"
          />
          <br />
          {this.state.loading ? (
            <div className="loading"></div>
          ) : (
            Object.keys(this.state.popular).map((section_title) => {
              return (
                <BasicNewsSection
                  key={section_title}
                  title={section_title}
                  media={this.state.popular[section_title].media.map(
                    (article) => {
                      return (
                        <StandardNewsCard article={article} key={article.id} />
                      );
                    }
                  )}
                  no_media={this.state.popular[section_title].no_media.map(
                    (article) => {
                      return (
                        <BasicNewsCard
                          noImage={true}
                          horizontal={true}
                          article={article}
                          key={article.id}
                        />
                      );
                    }
                  )}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default TemplateClassComponent;
