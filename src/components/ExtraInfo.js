import React from 'react';
import {Segment, Header} from 'semantic-ui-react';
import {formatPhone} from '../utils/helpers';

// Seção de conteúdo extra do InfoWindow (apenas se houverem dados)
const ExtraInfo = (poi) => {
  const {hours, contact, rating, categories, url} = poi;
  return (
    hours ||
    contact.phone ||
    rating ||
    (categories && categories.length ? true : false) ||
    url
  ) ? (
    <Segment vertical>
      <Header as="h5">More</Header>
      <ul>
        {hours && (
          <li>
            <strong>Status: </strong>{hours.status}
          </li>
        )}
        {contact.phone && (
          <li>
            <strong>Phone: </strong>
            {formatPhone(contact.phone)}
          </li>)
        }
        {rating && (
          <li>
            <strong>Rating: </strong>{rating}
          </li>)
        }
        {categories && categories.length ? (
          <li>
            <strong>Category: </strong>{categories[0].name}
          </li>
          ) : ''
        }
        {url && (
          <li>
            <strong>
              <a href={url} target='blank'>Website</a>
            </strong>
          </li>)
        }
      </ul>
    </Segment>
  ) : '';
};

export default ExtraInfo;
