import React, { Component } from 'react';
import {Container, Segment, Header, Icon, Image} from 'semantic-ui-react';
import {formatPhone} from '../utils/helpers'

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
    const {selectedPOI, id} = this.props;
    if(prevProps.selectedPOI !== selectedPOI){
      this.setState({ displayInfoWindow: selectedPOI === id});
    }
  }

  // TODO: Colocar tela de erro em caso de erro no fetching
  render(){
    const {title, $hover, selectedPOI, pois} = this.props;
    const {displayInfoWindow} = this.state;
    const poi = pois.find(p => p.id === selectedPOI)

    const Content = selectedPOI && poi.location.hasOwnProperty("address") ? (
      <Container text fluid textAlign='justified'>
        <Segment raised compact>
        <Image
          centered
          src={`${poi.bestPhoto
                ? poi.bestPhoto.prefix + '300x300' + poi.bestPhoto.suffix
                : '/no-image.png'}`}
          onClick={() => alert('ok')}
        />
        </Segment>
        <Segment vertical>
          <Header as="h5">Address</Header>
          <Segment basic size='small' style={{whiteSpace: 'pre-line'}}>
          {
            poi.location.address + '\n' +
            poi.location.city + ' – ' +  poi.location.state + ' – ' +  poi.location.country + '\n' +
            poi.location.postalCode
          }
          </Segment>
        </Segment>
        {(poi.hours || poi.contact || poi.rating || poi.categories.length || poi.url) && (
          <Segment vertical>
            <Header as="h5">More</Header>
            <ul>
              {poi.hours && (<li><strong>Status: </strong>{poi.hours.status + '\n'}</li>)}
              {poi.contact && (<li><strong>Phone: </strong>{formatPhone(poi.contact.phone) + '\n'}</li>)}
              {poi.rating && (<li><strong>Rating: </strong>{poi.rating + '\n'}</li>)}
              {poi.categories.length && (<li><strong>Category: </strong>{poi.categories[0].name + '\n'}</li>)}
              {poi.url && (<li><strong><a href={poi.url} target='blank'>Website</a></strong></li>)}
            </ul>
          </Segment>
        )}
      </Container>
    ) : (
      <Container text fluid>
        <Icon.Group size='huge'>
          <Icon loading size='big' name='circle notch' />
          <Icon name='foursquare' />
        </Icon.Group>
        <p>Loading data...</p>
      </Container>
    )

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: displayInfoWindow ? '1' : '0',
        transform: 'translate(-50%, -100%)',
        minWidth: '300px',
        maxWidth: '600px',
        maxHeight: '70vh',
      }}>
      {displayInfoWindow && (
        <Segment textAlign='center' style={{width: '100%'}}>
          <Header as='h3'>{title}</Header>
          { Content }
        </Segment>
      )}
        <Icon
          name='map marker alternate'
          style={{ cursor: 'default'}}
          size={displayInfoWindow || $hover ? 'huge' : 'large'}
          color={displayInfoWindow|| $hover ? 'teal' : 'red'}
          onClick={() => this.toggleInfoWindow()}
        />
      </div>
    )};
  }

  export default Marker;
