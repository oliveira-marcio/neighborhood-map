import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  Container,
  Segment,
  Header,
  Icon,
  Sidebar,
  Responsive,
  Modal
} from 'semantic-ui-react';
import AppMenu from './AppMenu';
import Marker from './Marker';
import * as FoursquareAPI from '../utils/FoursquareAPI';
import sortBy from 'sort-by';
import {removeCaseAndAccents} from '../utils/helpers';
import '../index.css';

class App extends PureComponent {
  state = {
    sideBarVisible: false,
    center: {
      lat: -22.84406,
      lng: -43.317548
    },
    zoom: 15,
    bounds: {},
    size: {},
    selectedPOI: "",
    filter: "",
    loadingPOIs: true,
    pois: [],
  };

  /**
   * É necessário guardar os limites e tamanho do mapa sempre que ele muda
   * (zoom ou drag) para calcular a centralização correta de um marker clicado
   */
  onChange = ({bounds, size}) => this.setState({bounds, size});

  /**
   * Evento de clique de um Marker
   * - Centraliza o mapa no poi selecionado com um offset vertical para ter
   * mais espaço para o InfoWindow
   * - Busca detalhes do Marker na API e salva no state. Se o Marker for clicado
   * novamente, serão utilizados os dados do state. Apenas Markers que não
   * receberam dados com sucesso da API fazem a consulta novamente na mesma.
   */
  onChildClick = (key, childProps) => {
    const {selectedPOI, pois, bounds, size} = this.state;

    if(selectedPOI !== childProps.id){
      const poi = {...pois.find(p => p.id === childProps.id)};
      if(!poi.hasOwnProperty("createdAt")){ // Marker ainda não tem dados
        if(poi.hasOwnProperty('errorType')){ // Marker não obteve dados da API
          delete poi.errorType;
          delete poi.errorDetail;
          this.setState({
            pois: [...pois.filter(p => p.id !== childProps.id), poi]
          });
        }
        FoursquareAPI.getPOIDetails(childProps.id)
        .then(detailedPoi => {
          this.setState({
            pois: [
              ...pois.filter(p => p.id !== childProps.id),
              {...poi, ...detailedPoi}
            ]
          });
        })
        .catch(error => {
          console.log(error);
          const connError = {
            errorType: "connection_error",
            errorDetail: error
          };

          this.setState({
            pois: [
              ...pois.filter(p => p.id !== childProps.id),
              {...poi, ...connError}
            ]
          });
        });
      }
    }

    // Cálculo do offset vertical de um Marker para ser cetralizado
    const pixelsOffset =
      window.innerWidth <= Responsive.onlyMobile.maxWidth ? 250 : 300;
    const latOffset =
      pixelsOffset * (bounds.nw.lat - bounds.se.lat) / size.height;

    this.setState({
      selectedPOI: selectedPOI === childProps.id ? "" : childProps.id,
      center: {
        lat: childProps.lat + latOffset,
        lng: childProps.lng
      }
    });
  }

  /**
   * Método para setar o filtro de POI's de acordo com o texto digitado
   */
  setFilter = (e) => {
    this.setState({filter: e.target.value});
  };

  /**
   * Métodos de controle da exibição da SideBar
   */
  onSideBarHide = () => this.setState({ sideBarVisible: false });
  onSideBarShow = () => this.setState({ sideBarVisible: true });

  // Todos os Markers são buscados aqui. Em caso de erro, é necessário
  // recarregar o app, pois não há o que fazer sem os Markers... ;-)
  componentDidMount(){
      FoursquareAPI.getAllPOIs()
      .then(pois => this.setState({pois, loadingPOIs: false}))
      .catch(error => {
        console.log(error);
        this.setState({pois: [], loadingPOIs: false})
      });
};

  render() {
    const {
      sideBarVisible,
      selectedPOI,
      pois,
      filter,
      loadingPOIs
    } = this.state;

    // POI's filtrados e ordenados por nome
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
    ));

    // Conteúdo do Modal inicial. Não é possível desabilitá-lo.
    // Possui 3 status de acordo com a disponibilidade dos Markers (sucesso em
    // obtê-los da API):
    // - LOADING - Exibe um status de loading
    // - ERRO - Exibe um status de erro
    // - NORMAL - Desaparece após obter os POI's
    const ModalContent = !(loadingPOIs || pois.length) ? ( // ERRO
      <Container text fluid textAlign='center'>
        <Icon name='grav' size='massive' />
        <Header as='h3' inverted>
          <p>Error loading data.</p>
          <p>Check your internet connection or try again later...</p>
        </Header>
      </Container>
    ) : ( // LOADING
      <Container text fluid textAlign='center'>
        <Icon.Group size='huge'>
          <Icon loading size='big' name='circle notch' />
          <Icon name='foursquare' />
        </Icon.Group>
        <Header as='h3' inverted>Loading data...</Header>
      </Container>
    );

    return (
      <Container fluid>
        <Sidebar.Pushable as={Segment} basic>
          <AppMenu
            sideBarVisible = {sideBarVisible}
            loadingPOIs = {loadingPOIs}
            pois = {pois}
            filteredPOIs = {filteredPOIs}
            selectedPOI = {selectedPOI}
            handleItemClick = {this.onChildClick}
            handleFilterChange = {this.setFilter}
            handleSidebarHide = {this.onSideBarHide}
          />
          <Sidebar.Pusher className='mainSideBar'>
            <Segment basic vertical inverted className='mainHeader'>
              <Header as='h1' inverted color='grey'>
                <Icon name='bars' onClick={this.onSideBarShow}/>
                Find My Pizza
              </Header>
            </Segment>
            <div className='appMap'>
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
            <Modal
              open={loadingPOIs || !pois.length}
              basic
              size='small'
              >
              <Modal.Content>
                { ModalContent }
              </Modal.Content>
            </Modal>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  };
};

export default App;
