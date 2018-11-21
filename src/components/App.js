import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Container, Segment, Header, Icon, Sidebar, Menu, Input} from 'semantic-ui-react';

class Marker extends Component {
  state = {
    displayInfoWindow: false
  };

  toggleInfoWindow = () => {
    this.setState({
      displayInfoWindow: !this.state.displayInfoWindow
    });
  };

  componentDidUpdate(prevProps){
    const {selectedMarker, id} = this.props;
    if((prevProps.selectedMarker !== selectedMarker) && (selectedMarker !== id)){
      this.setState({ displayInfoWindow: false});
    }
  }

  render(){
    const {text, $hover} = this.props;
    const {displayInfoWindow} = this.state;

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
      {displayInfoWindow && (
        <Segment>
          <Header as='h3' textAlign='center'>{text}</Header>
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
      )}
        <Icon
          name='map marker alternate'
          size={displayInfoWindow || $hover ? ("huge") : ("large")}
          color={displayInfoWindow|| $hover ? ("teal") : ("red")}
          onClick={() => this.toggleInfoWindow()}
        />
      </div>
    )};
  }

class App extends Component {
  state = {
    center: {
      lat: -22.849735,
      lng: -43.315725
    },
    zoom: 18,
    sideBarVisible: false,
    selectedMarker: -1
  };

  handleHideClick = () => this.setState({ sideBarVisible: false })
  handleShowClick = () => this.setState({ sideBarVisible: true })
  handleSidebarHide = () => this.setState({ sideBarVisible: false })
  onChildClick = (key, childProps) => {
    const {selectedMarker} = this.state;
    this.setState({
      selectedMarker: (selectedMarker === childProps.id ? -1 : childProps.id),
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      }
    });
  }

  componentDidMount(){
      const FOURSQUARE_BASE_API_URL = 'https://api.foursquare.com/v2/venues/search?'
      const FOURSQUARE_CLIENT_ID = "client_id=" + process.env.REACT_APP_FOURSQUARE_CLIENT_ID
      const FOURSQUARE_CLIENT_SECRET = "&client_secret=" + process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
      const API_VERSION = "&v=20130815"
      const COORDINATES = "&ll=-22.849735,-43.315725"
      const QUERY = "&query=Patio Carioca"
      let url = FOURSQUARE_BASE_API_URL + FOURSQUARE_CLIENT_ID + FOURSQUARE_CLIENT_SECRET
                + API_VERSION + COORDINATES + QUERY;

      fetch(url).then(res => res.json()).then(({meta, response}) => {
        if(meta.code === 200){
          if(response.venues.length){
            const poi = response.venues[0]
            console.log(`Nome: ${poi.name}\n` +
                        `Endereço: ${poi.location.address}\n` +
                        `Cidade: ${poi.location.city}\n` +
                        `Estado: ${poi.location.state}\n` +
                        `Pais: ${poi.location.country}\n` +
                        `CEP: ${poi.location.postalCode}\n` +
                        `Categoria: ${poi.categories[0].name}`)
          } else {
            console.log("Não encontrado")
          }
        } else {
          console.log(`${meta.errorType}: ${meta.errorDetail}`)
        }
      })

      const id = "4bb667511344b713c6739d04" // Carioca Shopping
      const FOURSQUARE_BASE_PHOTOS_URL = `https://api.foursquare.com/v2/venues/${id}/photos?`
      const PHOTO_VERSION = "&v=20150603"
      url = FOURSQUARE_BASE_PHOTOS_URL + FOURSQUARE_CLIENT_ID + FOURSQUARE_CLIENT_SECRET
                + PHOTO_VERSION;

      fetch(url).then(res => res.json()).then(({meta, response}) => {
        if(meta.code === 200){
          const items = response.photos.items
          if(items.length){
            console.log(`${items[0].prefix}300x300${items[0].suffix}`)
          } else {
            console.log("Não encontrado")
          }
        } else {
          console.log(`${meta.errorType}: ${meta.errorDetail}`)
        }
      })
  }

  render() {
    const { sideBarVisible, selectedMarker } = this.state

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
                center={this.state.center}
                zoom={this.state.zoom}
                onChildClick={this.onChildClick}
              >
                <Marker
                  id={0}
                  lat={-22.849735}
                  lng={-43.315725}
                  text={'Pátio Carioca'}
                  selectedMarker={selectedMarker}
                />

                <Marker
                  id={1}
                  lat={-22.850935}
                  lng={-43.316325}
                  text={'Outro'}
                  selectedMarker={selectedMarker}
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
