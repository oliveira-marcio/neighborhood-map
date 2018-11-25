import React from 'react';
import {Segment, Header} from 'semantic-ui-react';
import '../index.css';

// Seção de endereço do InfoWindow (apenas se houverem dados)
const Address = (poi) => {
  const {
    formattedAddress,
    address,
    city,
    state,
    country,
    postalCode
  } = poi.location;

  return (
    formattedAddress ||
    address ||
    city ||
    state ||
    country ||
    postalCode
  ) ? (
    <Segment vertical>
      <Header as="h5">Address</Header>
      {
        formattedAddress ? (
          <Segment basic size='small' className='modalAddress'>
          {formattedAddress.join('\n')}
          </Segment>
        ) : (
          <ul>
          {address && (
            <li>
              <strong>Address: </strong>{address}
            </li>
          )}
          {city && (
            <li>
              <strong>City: </strong>{city}
            </li>
          )}
          {state && (
            <li>
              <strong>State: </strong>{state}
            </li>
          )}
          {country && (
            <li>
              <strong>Country: </strong>{country}
            </li>
          )}
          {postalCode && (
            <li>
              <strong>Zip: </strong>{postalCode}
            </li>
          )}
          </ul>
        )
      }
    </Segment>
  ) : '';
}

export default Address;
