import React, { Component } from "react";
import autobind from "autobind";

import Button from "react-md/lib/Buttons/Button";
import Card from "react-md/lib/Cards/Card";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import TextField from "react-md/lib/TextFields/TextField";
import UserLinks from "../UserLinks/UserLinks";
import config from "../../../data/SiteConfig";
import avatar from "./Gavin-December-1989.png";

import "./About.scss";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { subject: "" };
  }

  @autobind
  onClick() {
    window.open(
      `mailto:website@gavinmogan.com?subject=${window.encodeURIComponent(
        this.state.subject
      )}&body=${window.encodeURIComponent(this.state.body)}`
    );
  }

  @autobind
  handleChange(field) {
    return value => {
      this.setState({ [field]: value });
    };
  }

  renderInput(field, name) {
    return (
      <TextField
        label={name}
        placeholder={name}
        value={this.state.subject}
        onChange={this.handleChange(field)}
        style={{ width: "100%" }}
        id={field}
      />
    );
  }

  renderText(field, name) {
    return (
      <TextField
        id={field}
        label={name}
        placeholder={name}
        rows={6}
        value={this.state.body}
        style={{ width: "100%" }}
        onChange={this.handleChange(field)}
      />
    );
  }

  render() {
    return (
      <div className="about-container md-grid mobile-fix">
        <Card className="md-cell md-cell--8">
          <div className="about-wrapper">
            <img src={avatar} className="about-img" alt={config.userName} />
            <CardText>
              <p className="about-text md-body-1">{config.userDescription}</p>
            </CardText>
            <UserLinks labeled config={config} />
          </div>
        </Card>

        <Card className="md-cell md-cell--8">
          <CardText>
            <CardTitle title="Contact" />
            {this.renderInput("subject", "Subject")}
            {this.renderText("body", "Body")}
            <Button onClick={this.onClick} raised primary>
              Send Email
            </Button>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default About;
