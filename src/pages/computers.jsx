import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Layout from '../layouts/index.jsx';
import SEO from '../components/SEO/SEO.jsx';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 30
  },
  media: {
    height: 500
  }
}));

const computers2003 = [
  {
    name: 'oinkpig',
    description: 'server',
    images: [
      {
        link: 'https://www.flickr.com/photos/halkeye/4201615159/',
        image: 'https://farm5.static.flickr.com/4002/4201615159_f5bfd89475.jpg'
      }
    ],
    primaryUse: 'gateway / nat / mail / web / etc',
    os: {
      text: 'Debian testing/unstable',
      link: 'https://www.debian.org',
      version: 'Linux 2.4.20'
    },
    stats: [
      'Pentium II 400MHz processor',
      '313.84 MB (i really have no idea how that number comes to be)',
      '2x 30 GB Hard drives (IBM-DTLA-307030 & WDC WD307AA-00BAA0)',
      '32X CD-Rom drive (I think disconnected though)',
      'ATI Technologies Inc 3D Rage Pro AGP 1X/2X',
      '2x Linksys Network Everywhere Fast Ethernet 10/100 model NC100'
    ]
  },
  {
    name: 'barkdog',
    description: 'Gaming / Windows Machine',
    images: [
      {
        link: 'https://www.flickr.com/photos/halkeye/4202371866/',
        image: 'https://farm3.static.flickr.com/2796/4202371866_12484b1499.jpg'
      },
      {
        link: 'https://www.flickr.com/photos/halkeye/4202372062/',
        image: 'https://farm3.static.flickr.com/2496/4202372062_5ed4d4f9a9.jpg'
      }
    ],
    primaryUse: 'gaming / chatting / mudding / etc',
    os: {
      text: 'Windows 2000',
      link: 'https://www.microsoft.com/windows2000/',
      version: ''
    },
    stats: [
      'Pentium IV 1.3GHz processor',
      '256 MB Memory (2x 128 MB Memory)',
      '20,80 GB Hard drive',
      '48X NEC DVD Drive',
      '52x48x52 LG CDRW Drive',
      'Nvidia Geforce 3',
      '3Com 3C920 Integrated Fast Ethernet Controller (3C905C-TX Compatible)',
      'Creative SBLive! Platinum',
      'Intel PC Camera Pro (USB)'
    ]
  },
  {
    name: 'moocow',
    description: 'IBM Laptop',
    images: [
      {
        link: 'https://www.flickr.com/photos/halkeye/4201615003/',
        image: 'https://farm3.static.flickr.com/2630/4201615003_a1bde70e75.jpg'
      }
    ],
    primaryUse: 'Coding/chatting/linux testing',
    os: {
      text: 'Gentoo Linux 1.4',
      link: 'https://www.gentoo.org',
      version: 'Linux 2.4.20'
    },
    stats: [
      'Pentium III 900MHz processor',
      '256 MB Memory',
      '20 GB Hard drive',
      '1.44 MB Floppy Drive',
      '8X DVD Rom drive',
      '1 USB port',
      '1 serial port',
      '1 parellel port',
      '1 PS/2 mouse/keyboard port',
      '15.0" SXGA TFT Active Matrix Display',
      'ATI Rage Mobility M3 AGP 2X 8MB SGRAM',
      '1400x1050 internal resolution',
      '2 type II or 1 type III PC card slot(s)',
      '56K v.90 MiniPCI Modem card',
      '16-bit Cristal Sound Fusion with internal speakers',
      'Intel Pro/100 SP miniPCI Ethernet Card, PXE enabled',
      '4 Mbps Infa-red port',
      'S-Video Out'
    ]
  }

];

export default function ComputersPage ({ location }) {
  const classes = useStyles();
  return (
    <Layout location={location} title="Computers">
      <SEO type="website" />
      <div className="computer-container">
        <h1>Computers</h1>

        <h2>2003 Version</h2>

        {computers2003.map((computer, idx) => (
          <React.Fragment key={computer.name}>
            <Card className={classes.card}>
              <CardActionArea>
                {computer.images.map(image => (
                  <a href={image.link} key={image.link} title={computer.name}>
                    <CardMedia
                      className={classes.media}
                      image={image.image}
                      title={computer.name}
                    />
                  </a>
                ))}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {computer.name}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <List>
                        <ListItem alignItems="flex-start" dense>
                          <ListItemText primary="Name" secondary={computer.name} />
                        </ListItem>
                        <ListItem alignItems="flex-start" dense>
                          <ListItemText primary="Description" secondary={computer.description} />
                        </ListItem>
                        <ListItem alignItems="flex-start" dense>
                          <ListItemText primary="Primary Use(s)" secondary={computer.primaryUse} />
                        </ListItem>
                        <ListItem alignItems="flex-start" dense>
                          <ListItemText primary="Os" secondary={<span><a href={computer.os.link}>{computer.os.text}</a> {computer.os.version}</span>} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={8}>
                      <List>
                        {computer.stats.map(stat => (
                          <ListItem dense alignItems="flex-start" key={stat}>
                            <ListItemText primary={stat} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
}
