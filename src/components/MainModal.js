import React from 'react';
import { Container, Header, Icon, Modal } from 'semantic-ui-react';

const MainModal = ({loadingPOIs, pois}) => {
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
    <Modal
      open={loadingPOIs || !pois.length}
      basic
      size='small'
      >
      <Modal.Content>
        { ModalContent }
      </Modal.Content>
    </Modal>
  );
};

export default MainModal;
