import React from "react";
import "./template.scss";

import { connect } from "react-redux";

import times from "utils/times";
import { Link } from "react-router-dom";

import {
  handlePeriod,
  handleSearchProper,
  getPopularArticles,
  toggleSearch,
  handleSearch,
} from "store/actions";

function Header(props) {
  const today = new Date();
  const period_section =
    props.onlyHeader === true ? null : (
      <div>
        <span>
          {today.toDateString()} | Showing {props.currentPeriod.text}'s paper
        </span>
        <i className="fas fa-angle-down" />
        <select
          value={+props.currentPeriod.period}
          onChange={props.onChange}
          name={props.name}
        >
          {times.map((period) => {
            return (
              <option key={period.period} value={+period.period}>
                {period.text}
              </option>
            );
          })}
        </select>
      </div>
    );
  return (
    <div className="header">
      <div className="logo">
        <Link to="/" onClick={props.clearSearch}>
          <div>
            The <span>Eye</span> Witness Report
          </div>
        </Link>
        {period_section}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    onlyHeader: ownProps.onlyHeader,
    currentPeriod: state.currentPeriod,
    name: "currentPeriod",
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      e.preventDefault();
      const period = times.find((period) => +period.period === +e.target.value);
      dispatch(handleSearchProper(""));
      dispatch(handlePeriod(period));
      dispatch(getPopularArticles(period.period));
    },
    clearSearch: () => {
      dispatch(toggleSearch(false));
      dispatch(handleSearchProper(""));
      dispatch(handleSearch(""));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
