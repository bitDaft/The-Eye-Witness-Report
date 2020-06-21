//
//
//

import { combineReducers } from "redux";

import {
  HANDLE_SEARCH,
  HANDLE_PERIOD,
  LOADING,
  RECIEVE_ARTICLE,
} from "store/actions";

import times from "utils/times";

function currentPeriod(state = times[0], action) {
  switch (action.type) {
    case HANDLE_PERIOD:
      return action.period;
    default:
      return state;
  }
}
function popular(state = {}, action) {
  switch (action.type) {
    case RECIEVE_ARTICLE:
      return action.articles;
    default:
      return state;
  }
}
function search(state = "", action) {
  switch (action.type) {
    case HANDLE_SEARCH:
      return action.text;
    default:
      return state;
  }
}
function loading(state = true, action) {
  switch (action.type) {
    case LOADING:
      return action.loading;
    default:
      return state;
  }
}

// function newsApp(state = {}, action) {
//   return {
//     currentPeriod: currentPeriod(state.currentPeriod, action),
//     popular: popular(state.popular, action),
//     search: search(state.search, action),
//     loading: loading(state.loading, action),
//   };
// }

const newsApp = combineReducers({
  currentPeriod,
  popular,
  search,
  loading,
});

export default newsApp;
