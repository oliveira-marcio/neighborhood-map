import React, { Component } from 'react';
import {Container, Segment, Header, Icon} from 'semantic-ui-react';

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
    const Content = selectedPOI && pois.find(p => p.id === selectedPOI).location.hasOwnProperty("address") ? (
      <Container text fluid textAlign='justified'>
        <p>
          Texto Grande pra caramba que ocupe espaço à beça e quanto mais texto esperamos que quebre a linha corretamente.
          Vamos botar mais texto para que o troço continue crescendo mais ainda.
          Vamos botar mais texto para que o troço continue crescendo mais ainda.
        </p>
        <p>
          Vamos botar mais texto para que o troço continue crescendo mais ainda.
        </p>
      </Container>
    ) : (
      <div>
      <Icon.Group size='huge'>
        <Icon loading size='big' name='circle notch' />
        <Icon name='foursquare' />
      </Icon.Group>
      <Container fluid text>Loading data...</Container>
      </div>
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
        width: '80vw',
        maxWidth: '600px'
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
