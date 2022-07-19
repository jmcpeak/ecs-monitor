import React, { Component } from "react";
import svg from "./active-spinner.svg";
import "./activeSpinnerComponent.css";

class ActiveSpinner extends Component {
  render() {
    return (
      <img
        alt="spinner"
        src={svg}
        role="presentation"
        className={`active-streaming-spinner-img ${this.props.className}`}
      />
    );
  }
}

export default ActiveSpinner;
