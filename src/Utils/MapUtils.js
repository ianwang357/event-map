const geohash = require('ngeohash');
export const MapUtils = {
    // aggregate county level raw data to states and nations levels
    convertEvents: function(events) {
        if (!events) { // sanity check
            return [];
        }
        let EventData = [];
        // aggregate data by state
        for (const point of events) {
            // sanity check
            if (!point || !point._embedded || !point._embedded.venues || point._embedded.venues.length === 0) {
                continue;
            }
            const venue = point._embedded.venues[0]; // Assuming there's at least one venue per event
            const coordinates = venue.location; // Extract the coordinates

            if (!coordinates) {
                continue; // Skip if coordinates are missing
            }

            // Append the event data directly to the eventData array
            EventData.push({
                name: point.name,
                lat: parseFloat(coordinates.latitude),
                lng: parseFloat(coordinates.longitude),
                venueName: venue.name,
                url: point.url,
                price: point.priceRanges ? point.priceRanges[0].min : 'Not Available'
            });
        }
        return EventData;
    },
    isInBoundary: function (bounds, lat, lng) {
        const coordinates = {
            latitude: lat,
            longitude: lng
        };
        return coordinates && bounds && bounds.nw && bounds.se && ((coordinates.longitude >= bounds.nw.lng && coordinates.longitude <= bounds.se.lng) || (coordinates.longitude <= bounds.nw.lng && coordinates.longitude >= bounds.se.lng))
            && ((coordinates.latitude >= bounds.se.lat && coordinates.latitude <= bounds.nw.lat) || (coordinates.latitude <= bounds.se.lat && coordinates.latitude >= bounds.nw.lat));
    },
    createGeoPoint: function(latitude, longitude) {
        return geohash.encode(latitude, longitude, 8);
    }
};