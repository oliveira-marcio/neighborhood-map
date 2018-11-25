const pois = [
  {
    id: "51e3d9f2498eaecbdfc906e8", // POI com apenas 'formattedAddress'
    name: "Pátio Carioca",
    createdAt: 12345678,
    location: {
      lat: -22.849735,
      lng: -43.315725,
      formattedAddress: ["R. Bernardo Taveira, 275", "Rio de Janeiro"],
    },
    canonicalUrl: "https://foursquare.com/v/p%C3%A1tio-carioca/51e3d9f2498eaecbdfc906e8",
    url: "http://lopes.com.br",
    contact: {
      phone: "+55219841257"
    },
    likes: {
      count: 7
    },
    categories: [{
      name: "Edifício"
    }]
  },
  {
    id: "4bb667511344b713c6739d04", // POI com dados completos'
    name: "Carioca Shopping",
    createdAt: 12345678,
    location: {
      lat: -22.849908714716804,
      lng: -43.311197904647671,
      address: "Av. Vicente de Carvalho, 909",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
      postalCode: "21210-623"
    },
    bestPhoto: {
      prefix: "https://fastly.4sqi.net/img/general/",
      suffix: "/1333789_mtcf1Cssnf69zfbHNtHz35qgLdfjoc4VfSOecYbYPpI.jpg"
    },
    canonicalUrl: "https://foursquare.com/v/carioca-shopping/4bb667511344b713c6739d04",
    url: "http://www.cariocashopping.com.br",
    contact: {
      phone: "+552124305120"
    },
    hours: {
      status: "Aberto até 22:00"
    },
    likes: {
      count: 671
    },
    rating: 6.5,
    categories: [{
      name: "Shopping Center"
    }]
  },
  {
    id: "abcd", // POI sem 'createdAt' para simular erro de fetch
    name: "POI com erro",
    location: {
      lat: -22.850235,
      lng: -43.316325,
    },
  }
];

// Equivalente ao método correspodente da API real
export const getAllPOIs = () => {
  return new Promise((res) => {
    const initialPois = [];
    pois.map(p => initialPois.push({
      id: p.id,
      name: p.name,
      location: {
        lat: p.location.lat,
        lng: p.location.lng
      }
    }));
    setTimeout(() => res(initialPois), 4000);
  });
};

// Equivalente ao método correspodente da API real
export const getPOIDetails = (id) => {
  return new Promise((res) => {
    setTimeout(() => {
      const currentPoi = {...pois.find(p => p.id === id)}
      res(currentPoi.hasOwnProperty("createdAt") ?
          currentPoi :
          {errorType: 'error', errorDetail: 'Error Test'});
    }, 1000);
  });
};

// Teste de retorno de dados reais da API
export function testRealAPI(){
  const FOURSQUARE_BASE_API_URL =
    'https://api.foursquare.com/v2/venues/search?';
  const FOURSQUARE_CLIENT_ID = "client_id=" +
    process.env.REACT_APP_FOURSQUARE_CLIENT_ID;
  const FOURSQUARE_CLIENT_SECRET = "&client_secret="
    + process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET;
  const API_VERSION = "&v=20181121";
  //const COORDINATES = "&near=Vila da Penha, Rio de Janeiro, RJ"
  const COORDINATES = "&ll=-22.849735,-43.315725";
  const QUERY = "&query=Patio Carioca";
  let url = FOURSQUARE_BASE_API_URL + FOURSQUARE_CLIENT_ID +
    FOURSQUARE_CLIENT_SECRET + API_VERSION + COORDINATES + QUERY;

  fetch(url).then(res => res.json()).then(({meta, response}) => {
    if(meta.code === 200){
      if(response.venues.length){
        console.log(response.venues);
        const poi = response.venues[0];
        console.log(`Nome: ${poi.name}\n` +
                    `ID: ${poi.id}\n` +
                    `Latitude: ${poi.location.lat}\n` +
                    `Longitude: ${poi.location.lng}\n`);
      } else {
        console.log("Não encontrado");
      }
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`);
    }
  })

//  const id = "51e3d9f2498eaecbdfc906e8"; // Pátio Carioca
  const id = "4bb667511344b713c6739d04"; // Carioca Shopping
  const FOURSQUARE_BASE_DETAILS_URL =
    `https://api.foursquare.com/v2/venues/${id}?`
  url = FOURSQUARE_BASE_DETAILS_URL + FOURSQUARE_CLIENT_ID +
    FOURSQUARE_CLIENT_SECRET + API_VERSION;

  fetch(url).then(res => res.json()).then(({meta, response}) => {
    if(meta.code === 200){
      const {bestPhoto, canonicalUrl, categories, contact,
            hours, likes, location, name, rating, url} = response.venue;
      console.log(response.venue);
      console.log(`Nome: ${name}\n` +
                  `Endereço: ${location.address}\n` +
                  `Cidade: ${location.city}\n` +
                  `Estado: ${location.state}\n` +
                  `Pais: ${location.country}\n` +
                  `CEP: ${location.postalCode}\n` +
                  `Foto: ${bestPhoto ? bestPhoto.prefix + '300x300' +
                            bestPhoto.suffix : '-'}\n` +
                  `URL (Foursquare): ${canonicalUrl}\n` +
                  `URL (Local): ${url ? url : '-'}\n` +
                  `Contato: ${contact ? contact.phone : '-'}\n` +
                  `Horário: ${hours ? hours.status : '-'}\n` +
                  `Likes: ${likes ? likes.count : '-'}\n` +
                  `Avaliação: ${rating ? rating : '-'}\n` +
                  `Categoria: ${categories.length ? categories[0].name : '-'}`);
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`);
    }
  });
};
