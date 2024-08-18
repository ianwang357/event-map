import axios from "axios"
const GOOGLE_API_KEY = ""
const TICKETMASTER_API_KEY = ''

export const EventService ={
    getNearbyVenues: async function(latitude, longitude, radius = 5000){
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${latitude},${longitude}`,
                radius: radius,
                type: 'stadium|museum|art_gallery|movie_theater|park|point_of_interest|establishment',
                key: GOOGLE_API_KEY
            }
          });
          return response.data.results;
    },
    getEventsByGeoPoint: async function(geopoint) {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
            params: {
                apikey: TICKETMASTER_API_KEY,
                geopoint: geopoint,
                radius: 50,
                unit: 'km'
            }
        });
        console.log(response)
        return response.data._embedded ? response.data._embedded.events : [];
    }
}