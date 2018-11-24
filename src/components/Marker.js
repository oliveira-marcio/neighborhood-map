import React, { Component } from 'react';
import {Container, Segment, Header, Icon, Image} from 'semantic-ui-react';
import {formatPhone} from '../utils/helpers';
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
    // - NORMAL - quando os dados já estão disponíveis (Ex: poi.location.address)
    // - ERRO - quando o fetch da API da falha (Ex: poi.errorType)
    // - LOADING - quando os dados ainda estão sendo buscados (Ex: quando nenhum
    // dos atributos acima está presente)
    const Content = selectedPOI && (
      poi.location.hasOwnProperty("address") ? ( // conteúdo NORMAL
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
          <Segment vertical>
            <Header as="h5">Address</Header>
            <Segment basic size='small' className='modalAddress'>
            {
              poi.location.address + '\n' +
              poi.location.city + ' – ' +
              poi.location.state + ' – ' +
              poi.location.country + '\n' +
              poi.location.postalCode
            }
            </Segment>
          </Segment>
          {(poi.hours ||
            poi.contact ||
            poi.rating ||
            poi.categories.length ||
            poi.url) && ( // Seção de conteúdo extra (apenas se houverem dados)
            <Segment vertical>
              <Header as="h5">More</Header>
              <ul>
                {poi.hours && (
                  <li>
                    <strong>Status: </strong>{poi.hours.status + '\n'}
                  </li>
                )}
                {poi.contact && (
                  <li>
                    <strong>Phone: </strong>
                    {formatPhone(poi.contact.phone) + '\n'}
                  </li>)
                }
                {poi.rating && (
                  <li>
                    <strong>Rating: </strong>{poi.rating + '\n'}
                  </li>)
                }
                {poi.categories.length && (
                  <li>
                    <strong>Category: </strong>{poi.categories[0].name + '\n'}
                  </li>
                )}
                {poi.url && (
                  <li>
                    <strong>
                      <a href={poi.url} target='blank'>Website</a>
                    </strong>
                  </li>)}
              </ul>
            </Segment>
          )}
        </Container>
      ) : poi.hasOwnProperty("errorType") ? ( // conteúdo ERRO
        <Container text fluid>
          <Icon name='grav' size='massive' />
          <Segment basic>Error loading data. Try again later...</Segment>
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
          name='map marker alternate'
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
