import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import {
  Button,
  Card,
  CardText,
  CardTitle,
  CardActions,
  TextField
} from 'react-md/lib';
import UserLinks from '../UserLinks/UserLinks.jsx';
import config from '../../../data/SiteConfig';
import avatar from './Gavin-December-1989.png';

import './About.scss';

class About extends Component {
  constructor (props) {
    super(props);
    this.state = { subject: '' };
  }

  @autobind
  onClick () {
    window.open(
      `mailto:website@gavinmogan.com?subject=${window.encodeURIComponent(
        this.state.subject
      )}&body=${window.encodeURIComponent(this.state.body)}`
    );
  }

  @autobind
  handleChange (field) {
    return value => {
      this.setState({ [field]: value });
    };
  }

  renderInput (field, name) {
    return (
      <TextField
        label={name}
        placeholder={name}
        value={this.state.subject}
        onChange={this.handleChange(field)}
        style={{ width: '100%' }}
        id={field}
      />
    );
  }

  renderText (field, name) {
    return (
      <TextField
        id={field}
        label={name}
        placeholder={name}
        rows={6}
        value={this.state.body}
        style={{ width: '100%' }}
        onChange={this.handleChange(field)}
      />
    );
  }

  render () {
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
            <CardTitle title="Where can you find me?" />
            <div className="md-grid">
              <Card className="md-cell md-cell--8">
                <CardTitle title="NodeSchool Vancouver" />
                <CardText>
                  <img
                    alt="nodeschool logo"
                    src="https://cdn.rawgit.com/kennethormandy/nodeschool-vancouver/ko-logo/logo.svg"
                    value="nodeschool"
                  />
                  Help out where I can. Usually finding a group that wants to do
                  a certain excersize at our events and help mentor them.
                </CardText>
                <CardActions>
                  <Button
                    href="https://community.vancouvertech.com/groups/nodeschool"
                    flat
                    secondary
                  >
                    forum
                  </Button>
                  <Button
                    href="https://github.com/nodeschool/vancouver"
                    flat
                    secondary
                  >
                    github
                  </Button>
                  <Button
                    href="https://meetup.com/nodeschool-vancouver"
                    flat
                    secondary
                  >
                    meetup
                  </Button>
                  <Button
                    href="https://twitter.com/nodeschoolyvr"
                    flat
                    secondary
                  >
                    twitter
                  </Button>
                </CardActions>
              </Card>
            </div>
          </CardText>
        </Card>

        <Card className="md-cell md-cell--8">
          <CardText>
            <CardTitle title="Contact" />
            {this.renderInput('subject', 'Subject')}
            {this.renderText('body', 'Body')}
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
