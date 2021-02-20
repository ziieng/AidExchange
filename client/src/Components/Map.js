import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from "react-icons/fa"

const Marker = () => {
  return <h3 style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}><FaMapMarkerAlt /></h3>
}

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    extra: "",
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
          defaultCenter={this.props.coords}
          defaultZoom={9}
        >
          <Marker lat={this.props.coords.lat} lng={this.props.coords.lng} />
          {(this.props.extra !== "") ? (<>
            {this.props.extra.map((spot, i) => {
              return (
                <Marker key={i} lat={spot.lat} lng={spot.lng} />
              );
            })}</>) : (<></>)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;