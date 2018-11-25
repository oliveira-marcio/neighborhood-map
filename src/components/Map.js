import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import '../index.css';

const Map = (props) => {
  const {
    filteredPOIs,
    selectedPOI,
    pois,
    center,
    zoom,
    onChildClick,
    onChange
  } = props;

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

  return (
    <div className='appMap'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
        onChildClick={onChildClick}
        onChange={onChange}
      >
        { Markers }
      </GoogleMapReact>
    </div>
  );
};

export default Map;
