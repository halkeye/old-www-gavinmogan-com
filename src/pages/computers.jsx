import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  Card,
  CardText,
  CardTitle,
  List,
  ListItem,
  Media,
  Grid, Cell
} from 'react-md/lib';
import Layout from '../layouts/index.jsx';

class ComputersPage extends Component {
  render () {
    return (
      <Layout location={this.props.location} title="Computers">
        <div className="computer-container">
          <Helmet>
            <title>Computers</title>
          </Helmet>
          <h1>Computers</h1>

          <h2>2003 Version</h2>

          <Card>
            <CardTitle title="oinkpig" />
            <CardText>
              <Media>
                <a href="https://www.flickr.com/photos/halkeye/4201615159/" title="oinkpig">
                  <img src="https://farm5.static.flickr.com/4002/4201615159_f5bfd89475.jpg" alt="oinkpig" />
                </a>
              </Media>
              <Grid>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Name" secondaryText="oinkpig" />
                    <ListItem primaryText="Description" secondaryText="server" />
                    <ListItem primaryText="Primary Use(s)" secondaryText="gateway / nat / mail / web / etc" />
                    <ListItem primaryText="Os" secondaryText={<span><a href="https://www.debian.org">Debian testing/unstable</a> Linux 2.4.20</span>} />
                  </List>
                </Cell>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Pentium II 400MHz processor" />
                    <ListItem primaryText="313.84 MB (i really have no idea how that number comes to be)" />
                    <ListItem primaryText="2x 30 GB Hard drives (IBM-DTLA-307030 &amp; WDC WD307AA-00BAA0)" />
                    <ListItem primaryText="32X CD-Rom drive (I think disconnected though)" />
                    <ListItem primaryText="ATI Technologies Inc 3D Rage Pro AGP 1X/2X" />
                    <ListItem primaryText="2x Linksys Network Everywhere Fast Ethernet 10/100 model NC100" />
                  </List>
                </Cell>
              </Grid>
            </CardText>
          </Card>

          <Card>
            <CardTitle title="barkdog" />
            <CardText>
              <Media>
                <a href="https://www.flickr.com/photos/halkeye/4202371866/" title="barkdog">
                  <img src="https://farm3.static.flickr.com/2796/4202371866_12484b1499.jpg" alt="barkdog" />
                </a>
                <a href="https://www.flickr.com/photos/halkeye/4202372062/" title="barkdog">
                  <img src="https://farm3.static.flickr.com/2496/4202372062_5ed4d4f9a9.jpg" alt="barkdog" />
                </a>
              </Media>
              <Grid>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Name" secondaryText="barkdog" />
                    <ListItem primaryText="Description" secondaryText="Gaming / Windows Machine" />
                    <ListItem primaryText="Primary Use(s)" secondaryText="gaming / chatting / mudding / etc" />
                    <ListItem primaryText="Os" secondaryText={<span><a href="https://www.microsoft.com/windows2000/">Windows 2000</a></span>} />
                  </List>
                </Cell>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Pentium IV 1.3GHz processor" />
                    <ListItem primaryText="256 MB Memory (2x 128 MB Memory)" />
                    <ListItem primaryText="20,80 GB Hard drive" />
                    <ListItem primaryText="48X NEC DVD Drive" />
                    <ListItem primaryText="52x48x52 LG CDRW Drive" />
                    <ListItem primaryText="Nvidia Geforce 3" />
                    <ListItem primaryText="3Com 3C920 Integrated Fast Ethernet Controller (3C905C-TX Compatible)" />
                    <ListItem primaryText="Creative SBLive! Platinum" />
                    <ListItem primaryText="Intel PC Camera Pro (USB)" />
                  </List>
                </Cell>
              </Grid>
            </CardText>
          </Card>

          <Card>
            <CardTitle title="moocow" />
            <CardText>
              <Media>
                <a href="https://www.flickr.com/photos/halkeye/4201615003/" title="moocow">
                  <img src="https://farm3.static.flickr.com/2630/4201615003_a1bde70e75.jpg" alt="moocow" />
                </a>
              </Media>
              <Grid>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Name" secondaryText="moocow" />
                    <ListItem primaryText="Description" secondaryText="IBM Laptop" />
                    <ListItem primaryText="Primary Use(s)" secondaryText="Coding/chatting/linux testing" />
                    <ListItem primaryText="Os" secondaryText={<span><a href="https://www.gentoo.org">Gentoo Linux 1.4</a> Linux 2.4.20</span>} />
                  </List>
                </Cell>
                <Cell size={6}>
                  <List ordered={false}>
                    <ListItem primaryText="Pentium III 900MHz processor" />
                    <ListItem primaryText="256 MB Memory" />
                    <ListItem primaryText="20 GB Hard drive" />
                    <ListItem primaryText="1.44 MB Floppy Drive" />
                    <ListItem primaryText="8X DVD Rom drive" />
                    <ListItem primaryText="1 USB port" />
                    <ListItem primaryText="1 serial port" />
                    <ListItem primaryText="1 parellel port" />
                    <ListItem primaryText="1 PS/2 mouse/keyboard port" />
                    <ListItem primaryText="15.0&quot; SXGA TFT Active Matrix Display" />
                    <ListItem primaryText="ATI Rage Mobility M3 AGP 2X 8MB SGRAM" />
                    <ListItem primaryText="1400x1050 internal resolution" />
                    <ListItem primaryText="2 type II or 1 type III PC card slot(s)" />
                    <ListItem primaryText="56K v.90 MiniPCI Modem card" />
                    <ListItem primaryText="16-bit Cristal Sound Fusion with internal speakers" />
                    <ListItem primaryText="Intel Pro/100 SP miniPCI Ethernet Card, PXE enabled" />
                    <ListItem primaryText="4 Mbps Infa-red port" />
                    <ListItem primaryText="S-Video Out" />
                  </List>
                </Cell>
              </Grid>
            </CardText>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default ComputersPage;
