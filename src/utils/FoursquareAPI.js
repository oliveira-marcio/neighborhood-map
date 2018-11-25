const FOURSQUARE_BASE_API_URL = 'https://api.foursquare.com/v2/venues/'
const FOURSQUARE_SEARCH_ENDPOINT = 'search'
const FOURSQUARE_CLIENT_ID = "?client_id=" +
                              process.env.REACT_APP_FOURSQUARE_CLIENT_ID
const FOURSQUARE_CLIENT_SECRET = "&client_secret=" +
                                  process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
const API_VERSION = "&v=20181121"
const COORDINATES = "&ll=-22.849735,-43.315725"
const QUERY = "&query=pizza,pizzas,pizzaria"
const RADIUS = "&radius=2500"
const LIMIT = "&limit=50"

export const getAllPOIs = () => {
  const url = FOURSQUARE_BASE_API_URL +
              FOURSQUARE_SEARCH_ENDPOINT +
              FOURSQUARE_CLIENT_ID +
              FOURSQUARE_CLIENT_SECRET +
              API_VERSION +
              COORDINATES +
              QUERY +
              RADIUS +
              LIMIT;

  return fetch(url)
  .then(res => res.json())
  .then(({meta, response}) => {
    if(meta.code === 200){
      return response.venues;
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`);
      return [];
    }
  });
};

export const getPOIDetails = (id) => {
  const url = FOURSQUARE_BASE_API_URL +
              id +
              FOURSQUARE_CLIENT_ID +
              FOURSQUARE_CLIENT_SECRET +
              API_VERSION;

  return fetch(url)
  .then(res => res.json())
  .then(({meta, response}) => {
    if(meta.code !== 200){
      console.log(meta);
      return meta;
    }
    return response.venue;
  });
};
