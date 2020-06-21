import React from "react";
import "./template.scss";

import { handleSearch, handleSearchProper, toggleSearch } from "store/actions";
import { connect } from "react-redux";

class SearchTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.ref = null;
    this.timer = 0;
    this.timer2 = 0;
  }
  componentWillUpdate(props) {
    console.log(props);
  }
  focus = () => {
    this.ref.focus();
    this.setState({ isFocused: true });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.timer2);
  }
  toggleSearchBar = (e) => {
    console.log("111");
    this.props.changeSearchState(!this.props.isSearchOpen);
    if (!this.props.isSearchOpen) {
      this.focus();
      clearInterval(this.timer);
      this.timer = window.setInterval(() => {
        if (!this.state.isFocused && !this.props.value) {
          this.props.changeSearchState(false);
          clearInterval(this.timer);
        }
      }, 1500);
    }
  };
  squishSearch = () => {
    this.timer2 = window.setTimeout(() => {
      this.setState({ isFocused: false });
      if (!this.props.value && this.props.isSearchOpen) {
        this.props.changeSearchState(false);
      }
    }, 150);
  };

  render() {
    let searchClasses = "search ";

    if (this.props.isSearchOpen) {
      searchClasses += "active ";
    }
    let icon = !this.props.isSearchOpen ? "fas fa-search" : "fas fa-times";
    return (
      <div className="search-topics">
        <ul>
          <li>US</li>
          <li>WORLD</li>
          <li>ARTS</li>
        </ul>
        <div className={searchClasses}>
          <input
            ref={(ref) => (this.ref = ref)}
            type="text"
            onBlur={this.squishSearch}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder="Search articles ..."
          />
          <div className="search-icon" onClick={this.toggleSearchBar}>
            <i className={icon} />
          </div>
        </div>
      </div>
    );
  }
}

let timer = 0;
let no_load = true;
const mapStateToProps = (state, ownProps) => {
  if (state.search) {
    no_load = false;
  }
  return {
    value: state.search,
    name: "currentPeriod",
    isSearchOpen: state.isSearchOpen,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeSearchState: (value) => {
      if (!value) {
        dispatch(handleSearchProper(""));
        if (!no_load) {
          dispatch(handleSearch(""));
        }
      }
      dispatch(toggleSearch(value));
    },
    onChange: (e) => {
      const value = e.target.value.trim();
      dispatch(handleSearchProper(value));
      if (value) {
        no_load = false;
      } else {
        no_load = true;
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        dispatch(handleSearch(value));
      }, 500);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTopics);
