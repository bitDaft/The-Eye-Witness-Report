import config from "config";

export const HANDLE_SEARCH = "HANDLE_SEARCH";
export const HANDLE_PERIOD = "HANDLE_PERIOD";
export const LOADING = "LOADING";
export const RECIEVE_ARTICLE = "RECIEVE_ARTICLE";

let conf = config[config.env];

export function handleSearchProper(text) {
  return {
    type: HANDLE_SEARCH,
    text,
  };
}

export function handleSearch(text) {
  return (dispatch, getState) => {
    let currentPeriod = +getState().currentPeriod.period;
    if (text) {
      dispatch(getSearchArticles(text));
    } else {
      dispatch(getPopularArticles(currentPeriod));
    }
  };
}

export function handlePeriod(period) {
  return {
    type: HANDLE_PERIOD,
    period,
  };
}

function changeLoading(loading) {
  return {
    type: LOADING,
    loading,
  };
}

function recieveArticles(articles) {
  return {
    type: RECIEVE_ARTICLE,
    articles,
  };
}

export function getPopularArticles(period) {
  return (dispatch) => {
    dispatch(changeLoading(true));
    return fetch(
      `${conf.base_url}/${conf.most_popular_endpoint}/viewed/${period}.json?api-key=${conf.api_key}`
    )
      .then((res) => res.json())
      .then((data) => data.results)
      .then((articles) => {
        let formatted_articles = {};
        articles.forEach((article) => {
          let formatted_article = {
            id: article.uri.split("/").reverse()[0],
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
        dispatch(recieveArticles(formatted_articles));
        dispatch(changeLoading(false));
      });
  };
}

export function getSearchArticles(text) {
  return (dispatch) => {
    dispatch(changeLoading(true));
    return fetch(
      `${conf.base_url}/${conf.search_endpoint}?q=${text}&fq=source:("The New York Times")&api-key=${conf.api_key}`
    )
      .then((res) => res.json())
      .then((data) => data.response.docs)
      .then((articles) => {
        let formatted_articles = {};
        articles.forEach((article) => {
          let formatted_article = {
            id: article.uri.split("/").reverse()[0],
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
        dispatch(recieveArticles(formatted_articles));
        dispatch(changeLoading(false));
      });
  };
}
