import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from "react-icons/fa"

const Marker = () => {
  return <h3 style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}><FaMapMarkerAlt /></h3>
}

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.coords.lat,
        lng: this.props.coords.lng
      }
    }
  }

  static defaultProps = {
    center: {
      lat: 47.568326599490476,
      lng: -122.64486808604016
    },
    extra: "",
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact defaultCenter={{ lat: 47.568326599490476, lng: -122.64486808604016 }}
          bootstrapURLKeys={{ key: process.env.REACT_APP_FIREBASE_API_KEY }}
          center={this.state.center}
          defaultZoom={10}
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