export default {
  env: "dev",
  dev: {
    api_key: "2QbGF5HasLA7kpVjV9j9vpv4rOYNv1Jd",
    top_story_endpoint: "topstories/v2",
    most_popular_endpoint: "mostpopular/v2",
    search_endpoint: "search/v2/articlesearch.json",
    base_url: "https://api.nytimes.com/svc",
  },
  staging: {
    api_key: "",
    top_story_endpoint: "topstories/v2",
    most_popular_endpoint: "mostpopular/v2",
    search_endpoint: "search/v2/articlesearch.json",
    base_url: "https://api.nytimes.com/svc",
  },
  prod: {
    api_key: "",
    top_story_endpoint: "topstories/v2",
    most_popular_endpoint: "mostpopular/v2",
    search_endpoint: "search/v2/articlesearch.json",
    base_url: "https://api.nytimes.com/svc",
  },
};
