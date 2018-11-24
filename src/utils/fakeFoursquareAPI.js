const pois = [
  {
    id: "51e3d9f2498eaecbdfc906e8",
    name: "Pátio Carioca",
    location: {
      lat: -22.849735,
      lng: -43.315725,
      address: "R. Bernardo Taveira, 275",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
      postalCode: "21220-290"
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
    id: "4bb667511344b713c6739d04",
    name: "Carioca Shopping",
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
    id: "abcd",
    name: "POI com erro",
    location: {
      lat: -22.850235,
      lng: -43.316325,
    },
    categories: []
  }
];

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

export const getPOIDetails = (id) => {
  return new Promise((res) => {
    setTimeout(() => {
      const currentPoi = {...pois.find(p => p.id === id)}
      if(!currentPoi.location.hasOwnProperty("address")){
        currentPoi.errorType = 'xpto';
        currentPoi.errorDetail = 'abcd';
      }
      res(currentPoi);
    }, 1000);
  });
};
