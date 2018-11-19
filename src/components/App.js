import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Container, Segment, Header, Icon, Sidebar, Menu, Input} from 'semantic-ui-react';

const Marker = (props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      width: '70vh'
    }}>
      <Segment>
        <Header as='h3' textAlign='center'>{props.text}</Header>
        <Container text textAlign='justified'>
          <p>
            Texto Grande pra caramba que ocupe espaço à beça e quanto mais texto esperamos que quebre a linha corretamente.
            Vamos botar mais texto para que o troço continue crescendo mais ainda.
            Vamos botar mais texto para que o troço continue crescendo mais ainda.
          </p>
          <p>
            Vamos botar mais texto para que o troço continue crescendo mais ainda.
          </p>
        </Container>
      </Segment>
      <Icon name='map marker alternate' size="huge" color="red"/>
    </div>
)};

class App extends Component {
  state = {
    center: {
      lat: -22.849735,
      lng: -43.315725
    },
    zoom: 18,
    sideBarVisible: false
  };

  handleHideClick = () => this.setState({ sideBarVisible: false })
  handleShowClick = () => this.setState({ sideBarVisible: true })
  handleSidebarHide = () => this.setState({ sideBarVisible: false })

  render() {
    const { sideBarVisible } = this.state

    return (
      <Container fluid>
        <Sidebar.Pushable as={Segment} basic>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sideBarVisible}
            width='thin'
          >
            <Menu.Item header>
              Locations
            </Menu.Item>
            <Input fluid icon={<Icon name='filter' inverted bordered color='teal' />} placeholder='Filter...' />
            <Menu.Item as='a'>
              <Icon name='map marker' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='map marker' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='map marker' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic vertical inverted>
              <Header as='h1' inverted color='grey'>
                <Icon name='bars' onClick={this.handleShowClick}/>
                Neighborhood Map
              </Header>
            </Segment>
            <div style={{ margin: 0, height: '90vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
                <Marker
                  lat={-22.849735}
                  lng={-43.315725}
                  text={'Pátio Carioca'}
                />
              </GoogleMapReact>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default App;
