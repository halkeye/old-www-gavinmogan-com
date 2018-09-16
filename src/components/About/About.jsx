import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import {
  withStyles,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  TextField
} from '@material-ui/core';
import UserLinks from '../UserLinks/UserLinks.jsx';
import config from '../../../data/SiteConfig';
import avatar from './Gavin-December-1989.png';

import './About.scss';

const styles = theme => ({
  section: {
    padding: `${theme.spacing.unit * 1}px`,
    marginTop: `${theme.spacing.unit * 6}px`
  }
});

const whereAmI = [
  {
    key: 'nodeschool-yvr',
    name: 'NodeSchool Vancouver',
    logo: 'https://cdn.rawgit.com/kennethormandy/nodeschool-vancouver/ko-logo/logo.svg',
    description: 'Help out where I can. Usually finding a group that wants to do a certain excersize at our events and help mentor them.',
    links: [
      {
        url: 'https://community.vancouvertech.com/groups/nodeschool',
        title: 'forum'
      },
      {
        url: 'https://github.com/nodeschool/vancouver',
        title: 'github'
      },
      {
        url: 'https://meetup.com/nodeschool-vancouver',
        title: 'meetup'
      },
      {
        url: 'https://twitter.com/nodeschoolyvr',
        title: 'twitter'
      }
    ]
  }
];
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
    const { classes } = this.props;
    return (
      <div className="mobile-fix">
        <Card className={classes.section}>
          <CardContent className="about-wrapper">
            <img src={avatar} className="about-img" alt={config.userName} />
            <CardContent>
              <p className="about-text">{config.userDescription}</p>
            </CardContent>
            <UserLinks labeled config={config} />
          </CardContent>
        </Card>

        <Card className={classes.section}>
          <CardHeader title="Where can you find me?" />
          <CardContent>
            <Grid container spacing={40} alignItems="flex-end">
              <Grid item key="nodeschoolyvr" xs={12} sm={6} md={8}>
                { whereAmI.map(elm => (
                  <Card key={elm.key}>
                    <CardHeader title={elm.name} />
                    <CardContent>
                      <img alt={`${elm.name} logo`} src={elm.logo} />
                      {elm.description}
                    </CardContent>
                    <CardActions>
                      {
                        elm.links.map(link => (
                          <Button href={link.url} key={link.title} color="secondary">
                            {link.title}
                          </Button>
                        ))
                      }
                    </CardActions>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.section}>
          <CardHeader title="Contact" />
          <CardContent>
            {this.renderInput('subject', 'Subject')}
            {this.renderText('body', 'Body')}
            <Button onClick={this.onClick} variant="contained" color="primary">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(About);
