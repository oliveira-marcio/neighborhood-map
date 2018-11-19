import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Container, Segment, Header, Icon, Sidebar, Menu, Input} from 'semantic-ui-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  state = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
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
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text={'Kreyser Avrora'}
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
