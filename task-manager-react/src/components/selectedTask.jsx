import React, { Component } from "react";

class SelectedTask extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <React.Fragment>
        <div className="row"></div>
        <div className="row">
          <h1>Task - {this.props.match.params.id}</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default SelectedTask;
