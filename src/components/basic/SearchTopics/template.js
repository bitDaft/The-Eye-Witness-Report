import React from "react";
import "./template.scss";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class SearchTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: !!props.value.length,
      searchQuery: props.value,
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
      (state) => ({ search: !this.state.search, searchQuery: "" }),
      () => {
        this.ref.value = "";
        if (this.state.search) {
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

export default SearchTopics;
