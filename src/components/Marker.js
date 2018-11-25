import React, { Component } from 'react';
import {Container, Segment, Header, Icon, Image} from 'semantic-ui-react';
import Address from './Address';
import ExtraInfo from './ExtraInfo';
import '../index.css';

class Marker extends Component {
  state = {
    displayInfoWindow: false
  };

  toggleInfoWindow = () => {
    this.setState({
      displayInfoWindow: !this.state.displayInfoWindow
    });
  };

  /**
   * Se outro Marker for clicado, habilita o seu InfoWindow e desabilita o
   * atual
   */
  componentDidUpdate(prevProps){
    const {selectedPOI, id} = this.props;
    if(prevProps.selectedPOI !== selectedPOI){
      this.setState({ displayInfoWindow: selectedPOI === id});
    }
  };

  render(){
    const {title, $hover, selectedPOI, pois} = this.props;
    const {displayInfoWindow} = this.state;
    const poi = pois.find(p => p.id === selectedPOI);

    // Existem 3 possíveis conteúdos para o InfoWindow de acordo com certos
    // atributos existentes no objeto 'poi':
    // - NORMAL - quando os dados já estão disponíveis (Ex: poi.createdAt)
    // - ERRO - quando o fetch da API da falha (Ex: poi.errorType)
    // - LOADING - quando os dados ainda estão sendo buscados (Ex: quando nenhum
    // dos atributos acima está presente)
    const Content = selectedPOI && (
      poi.hasOwnProperty("createdAt") ? ( // conteúdo NORMAL
        <Container text fluid textAlign='justified'>
          <Segment raised compact>
          <Image
            centered
            src={`${poi.bestPhoto
                  ? poi.bestPhoto.prefix + '300x300' + poi.bestPhoto.suffix
                  : '/no-image.png'}`}
            alt={title}
            title={title}
          />
          </Segment>
          <Address {...poi} />
          <ExtraInfo {...poi} />
          <Segment basic vertical textAlign='center'>
            Credits to &nbsp;
            <a href='https://foursquare.com/' target='blank'>
              Foursquare ®
            </a>
          </Segment>
        </Container>
      ) : poi.hasOwnProperty("errorType") ? ( // conteúdo ERRO
        <Container text fluid>
          <Icon name='grav' size='massive' />
          <Segment basic>
            <p>Error loading data.</p>
            <p>Check your internet connection or try again later...</p>
          </Segment>
        </Container>
      ) : ( // conteúdo LOADING
        <Container text fluid>
          <Icon.Group size='huge'>
            <Icon loading size='big' name='circle notch' />
            <Icon name='foursquare' />
          </Icon.Group>
          <Segment basic>Loading data...</Segment>
        </Container>
      )
    );

    return (
      <div
        className={ displayInfoWindow ?
          'modalContainer elevated' : 'modalContainer'}
      >
      {displayInfoWindow && (
        <Segment textAlign='center' className='modalHeader'>
          <Header as='h3'>{title}</Header>
          { Content }
        </Segment>
      )}
        <Icon
          name='food'
          className='markerCursor'
          size={displayInfoWindow || $hover ? 'huge' : 'large'}
          color={displayInfoWindow|| $hover ? 'teal' : 'red'}
          onClick={() => this.toggleInfoWindow()}
        />
      </div>
    );
  };
};

export default Marker;
