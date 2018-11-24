const FOURSQUARE_BASE_API_URL = 'https://api.foursquare.com/v2/venues/search?'
const FOURSQUARE_CLIENT_ID = "client_id=" + process.env.REACT_APP_FOURSQUARE_CLIENT_ID
const FOURSQUARE_CLIENT_SECRET = "&client_secret=" + process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
const API_VERSION = "&v=20181121"
const COORDINATES = "&ll=-22.849735,-43.315725"
//const COORDINATES = "&near=Vila da Penha, Rio de Janeiro, RJ"
const QUERY = "&query=pizza,pizzas,pizzaria"
const RADIUS = "&radius=2500"
const LIMIT = "&limit=50"

export function testAPI(){
  const FOURSQUARE_BASE_API_URL = 'https://api.foursquare.com/v2/venues/search?'
  const FOURSQUARE_CLIENT_ID = "client_id=" + process.env.REACT_APP_FOURSQUARE_CLIENT_ID
  const FOURSQUARE_CLIENT_SECRET = "&client_secret=" + process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
  const API_VERSION = "&v=20181121"
  const COORDINATES = "&ll=-22.849735,-43.315725"
  const QUERY = "&query=Patio Carioca"
  let url = FOURSQUARE_BASE_API_URL + FOURSQUARE_CLIENT_ID + FOURSQUARE_CLIENT_SECRET
            + API_VERSION + COORDINATES + QUERY;

  fetch(url).then(res => res.json()).then(({meta, response}) => {
    if(meta.code === 200){
      if(response.venues.length){
        console.log(response.venues)
        const poi = response.venues[0]
        console.log(`Nome: ${poi.name}\n` +
                    `ID: ${poi.id}\n` +
                    `Latitude: ${poi.location.lat}\n` +
                    `Longitude: ${poi.location.lng}\n`)
      } else {
        console.log("Não encontrado")
      }
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`)
    }
  })

//  const id = "51e3d9f2498eaecbdfc906e8" // Pátio Carioca
  const id = "4bb667511344b713c6739d04" // Carioca Shopping
  const FOURSQUARE_BASE_DETAILS_URL = `https://api.foursquare.com/v2/venues/${id}?`
  url = FOURSQUARE_BASE_DETAILS_URL + FOURSQUARE_CLIENT_ID + FOURSQUARE_CLIENT_SECRET
            + API_VERSION;

  fetch(url).then(res => res.json()).then(({meta, response}) => {
    if(meta.code === 200){
      const {bestPhoto, canonicalUrl, categories, contact, hours, likes, location, name, rating, url} = response.venue
      console.log(response.venue)
      console.log(`Nome: ${name}\n` +
                  `Endereço: ${location.address}\n` +
                  `Cidade: ${location.city}\n` +
                  `Estado: ${location.state}\n` +
                  `Pais: ${location.country}\n` +
                  `CEP: ${location.postalCode}\n` +
                  `Foto: ${bestPhoto ? bestPhoto.prefix + '300x300' + bestPhoto.suffix : '-'}\n` +
                  `URL (Foursquare): ${canonicalUrl}\n` +
                  `URL (Local): ${url ? url : '-'}\n` +
                  `Contato: ${contact ? contact.phone : '-'}\n` +
                  `Horário: ${hours ? hours.status : '-'}\n` +
                  `Likes: ${likes ? likes.count : '-'}\n` +
                  `Avaliação: ${rating ? rating : '-'}\n` +
                  `Categoria: ${categories.length ? categories[0].name : '-'}`)
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`)
    }
  })


  const FOURSQUARE_BASE_PHOTOS_URL = `https://api.foursquare.com/v2/venues/${id}/photos?`
  url = FOURSQUARE_BASE_PHOTOS_URL + FOURSQUARE_CLIENT_ID + FOURSQUARE_CLIENT_SECRET
            + API_VERSION;

  fetch(url).then(res => res.json()).then(({meta, response}) => {
    if(meta.code === 200){
      const items = response.photos.items
      if(items.length){
        console.log(`${items[0].prefix}300x300${items[0].suffix}`)
      } else {
        console.log("Não encontrado")
      }
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`)
    }
  })
}

export function getAllPOIs(){
  const url = FOURSQUARE_BASE_API_URL + FOURSQUARE_CLIENT_ID +
        FOURSQUARE_CLIENT_SECRET + API_VERSION + COORDINATES + QUERY + RADIUS + LIMIT;
  return fetch(url)
  .then(res => res.json())
  .then(({meta, response}) => {
    if(meta.code === 200){
      return response.venues
    } else {
      console.log(`${meta.errorType}: ${meta.errorDetail}`)
      return []
    }
  })
}
