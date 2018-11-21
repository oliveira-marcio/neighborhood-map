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

  export default Marker;
