import axios from "axios"
const GOOGLE_API_KEY = "AIzaSyCZPZAxZpUEd_QYopGWece5ebMH5S65iSA"
const TICKETMASTER_API_KEY = 'AAVm6nCdSGYesVzx1gVAdulENPu3GFGP'

export const CovidDataService = {
    getAllCountyCases: function(){
        return axios.get("https://disease.sh/v3/covid-19/jhucsse/counties")
    }
}

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
    getEventsByGeoPoint: async function(geoPoint, radius = 10, unit = 'miles') {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
            params: {
                geoPoint: geoPoint,
                radius: radius,
                unit: unit,
                apikey: TICKETMASTER_API_KEY
            }
        });
        return response.data._embedded ? response.data._embedded.events : [];
    }
}