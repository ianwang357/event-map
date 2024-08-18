import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapUtils } from '../Utils/MapUtils';
import { EventService } from '../Service/EventDataService';
import CaseCard from './CaseCard';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class EventMap extends Component {
  static defaultProps = {
    center: {
      lat: 40,
      lng: -95
    },
    zoom: 6
  };

  state = {
      zoomLevel: 6,
      boundary: {},
      points: [],
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChange={(changeEventObject) => {
            console.log('Map change detected:', changeEventObject);
            const center = {
              lat: changeEventObject.center.lat,
              lng: changeEventObject.center.lng
            };
            let zoomLevel = changeEventObject.zoom;
            this.setState({
                zoomLevel: changeEventObject.zoom,
                boundary: changeEventObject.bounds,
                center: center
            });
            const geopoint = MapUtils.createGeoPoint(center.lat, center.lng);
            EventService.getEventsByGeoPoint(geopoint)
              .then(response => {
                  this.setState({
                      points: MapUtils.convertEvents(response),
                  });
              }).catch(error => {
                  console.error(error);
            })
          }}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
          {this.renderEvents()}
        </GoogleMapReact>
      </div>
    );
  }

  renderEvents() {
    const result = [];
    const zoomLevel = this.state.zoomLevel;
    // 1-4 nation level
    // 5-9 state level
    // 10-20 county level
    if (zoomLevel < 1 || zoomLevel > 20) {
        return result;
    }

    const pointsToRender = this.state.points;
    // Sanity Check -> first time render this component, but data not available
    if (!pointsToRender) {
        return result;
    }
    for (const point of pointsToRender) {
      if (MapUtils.isInBoundary(this.state.boundary, point.lat, point.lng)) {
          result.push(
              <CaseCard
                  key={point.id} // Ensure you have a unique key
                  lat={point.lat}
                  lng={point.lng}
                  venueName={point.venueName}
                  name={point.name}
                  url={point.url}
                  price={point.price} // Use appropriate metric, or remove if not needed
              />
          );
      }
  }
    return result;
  }
}

export default EventMap;