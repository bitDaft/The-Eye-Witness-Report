import React from "react";
import "./template.scss";

import { handleSearch, handleSearchProper } from "store/actions";
import { connect } from "react-redux";

class SearchTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: !!props.value.length,
      isFocused: false,
    };
    this.ref = null;
    this.timer = 0;
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  toggleSearchBar = (e) => {
    if (!this.state.search) {
      this.ref.focus();
      this.setState({ isFocused: true });
    }
    this.setState(
      (state) => ({ search: !this.state.search }),
      () => {
        this.ref.value = "";
        if (this.state.search) {
          clearInterval(this.timer);
          this.timer = window.setInterval(() => {
            if (!this.state.isFocused && !this.props.value) {
              clearInterval(this.timer);
              this.setState({ search: false });
            }
          }, 1500);
        }
        this.props.onChange({
          target: {
            name: this.props.name,
            value: "",
          },
        });
      }
    );
  };
  squishSearch = () => {
    window.setTimeout(() => {
      this.setState({ isFocused: false });
      if (!this.props.value) {
        this.setState((state) => ({ search: false }));
      }
    }, 100);
  };

  render() {
    let searchClasses = "search ";

    if (this.state.search) {
      searchClasses += "active ";
    }
    let icon = !this.state.search ? "fas fa-search" : "fas fa-times";
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
const mapStateToProps = (state, ownProps) => {
  return {
    value: state.search,
    name: "currentPeriod",
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      const value = e.target.value.trim();
      dispatch(handleSearchProper(value));
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        dispatch(handleSearch(value));
      }, 500);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTopics);
// export default SearchTopics;
