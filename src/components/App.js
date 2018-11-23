import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import {Container, Segment, Header, Icon, Sidebar, Menu, Input, Responsive} from 'semantic-ui-react';
import Marker from './Marker'
import * as FoursquareAPI from '../utils/FoursquareAPI'
import sortBy from 'sort-by'
import {removeCaseAndAccents} from '../utils/helpers'

class App extends PureComponent {
  state = {
    center: {
      lat: -22.84406,
      lng: -43.317548
    },
    zoom: 15,
    bounds: {},
    size: {},
    sideBarVisible: false,
    selectedPOI: "",
    filter: "",
    pois: [],
    sideBarWidth: window.innerWidth > Responsive.onlyMobile.maxWidth ? 'wide' : 'thin'
  };

  onChange = ({bounds, size}) => this.setState({bounds, size})
  onChildClick = (key, childProps) => {
    // TODO: Implementar clique do menu e/ou seleção do mesmo quando Marker for clicado
    const {selectedPOI, pois, bounds, size} = this.state;

    if(selectedPOI !== childProps.id){
      if(!pois.find(p => p.id === childProps.id).location.hasOwnProperty("address")){
        console.log('fetching')
        FoursquareAPI.getPOIDetails(childProps.id)
        .then(poi => {
          this.setState({
            pois: [...pois.filter(p => p.id !== childProps.id), poi]
          })
        });
      }
    }

    const latOffset = 200 * (bounds.nw.lat - bounds.se.lat) / size.height

    this.setState({
      selectedPOI: selectedPOI === childProps.id ? "" : childProps.id,
      center: {
        lat: childProps.lat + latOffset,
        lng: childProps.lng
      }
    });
  }

  handleHideClick = () => this.setState({ sideBarVisible: false })
  handleShowClick = () => this.setState({ sideBarVisible: true })
  handleSidebarHide = () => this.setState({ sideBarVisible: false })

  toggleSideBarWidth = () => {
    const {sideBarWidth} = this.state
    if(sideBarWidth === 'wide' && window.innerWidth <= Responsive.onlyMobile.maxWidth){
      this.setState({sideBarWidth: 'thin'})
    }
    if(sideBarWidth === 'thin' && window.innerWidth > Responsive.onlyMobile.maxWidth){
      this.setState({sideBarWidth: 'wide'})
    }
  }

  setFilter = (e) => {
    this.setState({filter: e.target.value});
  }

  componentDidMount(){
//      FoursquareAPI.testAPI()
//      FoursquareAPI.getPizzaPOIs()
      FoursquareAPI.getAllPOIs()
      .then(pois => this.setState({pois}))
      // TODO: Colocar tela de loading enquanto POI's são carregados
      // TODO: Colocar tela de erro
  }

  render() {
    const { sideBarVisible, selectedPOI, pois, sideBarWidth, filter } = this.state;
    const filteredPOIs =  pois.filter(p =>
      removeCaseAndAccents(p.name)
      .includes(removeCaseAndAccents(filter))
    ).sort(sortBy('name'));

    const Markers = filteredPOIs.map(poi => (
      <Marker
        key={poi.id}
        id={poi.id}
        lat={poi.location.lat}
        lng={poi.location.lng}
        title={poi.name}
        selectedPOI={selectedPOI}
        pois={pois}
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
            width={sideBarWidth}
          >
            <Menu.Item header>
              Locations
            </Menu.Item>
            <Input fluid icon={<Icon name='filter' inverted bordered color='teal' />} placeholder='Filter...' onChange={this.setFilter}/>
            <Responsive onUpdate={() => this.toggleSideBarWidth()} />
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
                onChange={this.onChange}
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
