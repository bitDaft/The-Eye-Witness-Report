import React from "react";
import "./template.scss";

// function TemplateFuncComponent(props) {
//   return (
//     <div></div>
//   );
// }

class TemplateClassComponent extends React.Component {
  render() {
    const today = new Date();
    return (
      <div className="header">
        <div className="pop-up">=</div>
        <div className="logo">
          <div>The Eye Witness Report</div>
          <div>
            <span>
              {today.toDateString()} | Showing {this.props.text}'s paper
            </span>
            <i className="fas fa-angle-down" />
            <select value={this.props.value} onChange={this.props.onChange} name={this.props.name}>
              {this.props.periods.map((period) => {
                return <option key={period.period} value={period.period}>{period.text}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateClassComponent;
