import React, {Component} from 'react';
import {Icon, Sidebar, Menu, Input, Responsive} from 'semantic-ui-react';

class AppMenu extends Component {
  state = {
    sideBarWidth: window.innerWidth > Responsive.onlyMobile.maxWidth ?
      'wide' : 'thin'
  };

  /**
   * Método para alternar a largura da SideBar conforme o tamanho da viewport
   */
  toggleSideBarWidth = () => {
    const {sideBarWidth} = this.state;
    if(sideBarWidth === 'wide' &&
        window.innerWidth <= Responsive.onlyMobile.maxWidth){
      this.setState({sideBarWidth: 'thin'});
    }
    if(sideBarWidth === 'thin' &&
        window.innerWidth > Responsive.onlyMobile.maxWidth){
      this.setState({sideBarWidth: 'wide'});
    }
  };


  render(){
    const {sideBarWidth} = this.state;
    const {
      sideBarVisible,
      loadingPOIs,
      pois,
      filteredPOIs,
      selectedPOI,
      handleItemClick,
      handleFilterChange,
      handleSidebarHide
    } = this.props;

    // Itens do menu da SideBar. Possui 3 status de acordo com a disponibilidade
    // dos Markers (sucesso em obtê-los da API):
    // - NORMAL - Exibe todos os POI's
    // - LOADING - Exibe um status de loading
    // - ERRO - Exibe um status de erro
    const MenuPOIs = loadingPOIs ? ( // LOADING
      <Menu.Item>
        <Icon loading name='circle notch' />
        Loading...
      </Menu.Item>
    ) : !pois.length ? ( // ERRO
      <Menu.Item>
        <Icon name='grav' />
        Places unavailable. Try again later...
      </Menu.Item>
    ) : filteredPOIs.map(poi => ( // NORMAL
      <Menu.Item as='a'
        key={poi.id}
        active={poi.id === selectedPOI}
        onClick={() => handleItemClick(null, {
          id: poi.id,
          lat: poi.location.lat,
          lng: poi.location.lng
        })}
      >
        <Icon name='food' />
        {poi.name}
      </Menu.Item>
    ));

    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        direction='left'
        icon='labeled'
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sideBarVisible}
        width={sideBarWidth}
      >
        <Menu.Item header>
          Locations
        </Menu.Item>
        <Input
          fluid
          icon={<Icon name='filter' inverted bordered color='teal' />}
          placeholder='Filter...'
          onChange={handleFilterChange}
          />
        <Responsive onUpdate={() => this.toggleSideBarWidth()} />
        { MenuPOIs }
      </Sidebar>
    );
  };
};

export default AppMenu;
