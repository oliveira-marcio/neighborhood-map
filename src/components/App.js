import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Container, Segment, Header, Icon, Sidebar, Menu, Input} from 'semantic-ui-react';
import Marker from './Marker'
import * as FoursquareAPI from '../utils/FoursquareAPI'
import sortBy from 'sort-by'

class App extends Component {
  state = {
    center: {
      lat: -22.84406,
      lng: -43.317548
    },
    zoom: 15,
    sideBarVisible: false,
    selectedMarker: "",
    pois: []
  };

  handleHideClick = () => this.setState({ sideBarVisible: false })
  handleShowClick = () => this.setState({ sideBarVisible: true })
  handleSidebarHide = () => this.setState({ sideBarVisible: false })
  onChildClick = (key, childProps) => {
    const {selectedMarker} = this.state;
    this.setState({
      selectedMarker: (selectedMarker === childProps.id ? "" : childProps.id),
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      }
    });
  }

  componentDidMount(){
//      FoursquareAPI.testAPI()
//      FoursquareAPI.getAllPOIs()
      FoursquareAPI.getPizzaPOIs()
      .then(pois => this.setState({pois}))
  }

  render() {
    const { sideBarVisible, selectedMarker, pois } = this.state;
    const filteredPOIs =  pois.sort(sortBy('name'));

    const Markers = filteredPOIs.map(poi => (
      <Marker
        key={poi.id}
        id={poi.id}
        lat={poi.location.lat}
        lng={poi.location.lng}
        text={poi.name}
        selectedMarker={selectedMarker}
      />
    ))

    const MenuPOIs = filteredPOIs.map(poi => (
      <Menu.Item as='a' key={poi.id}>
        <Icon name='map marker alternate' />
        {poi.name}
      </Menu.Item>
    ))

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
            { MenuPOIs }
          </Sidebar>

          <Sidebar.Pusher style={{height: '100vh'}}>
            <Segment basic vertical inverted style={{height: '60px'}}>
              <Header as='h1' inverted color='grey'>
                <Icon name='bars' onClick={this.handleShowClick}/>
                Neighborhood Map
              </Header>
            </Segment>
            <div style={{ position: 'absolute', top: '60px', right: '0', bottom: '0',  left: '0' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                center={this.state.center}
                zoom={this.state.zoom}
                onChildClick={this.onChildClick}
              >
                { Markers }
              </GoogleMapReact>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default App;
