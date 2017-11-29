import React from "react";
import ReactMap from 'react-mapbox-gl';

const accessToken = "pk.eyJ1IjoiZWNoYXJyaXMxMjgiLCJhIjoiY2phbGd3MThsMnMwODMycnpibjI0cWxnZiJ9._O6xQrMmwIYCR9BCUX_2aA";
const style = "mapbox://styles/mapbox/streets-v9";

const Map = ReactMap({
  accessToken
});

const mapStyle = {
  height: '50vh',
  width: '50vw'
};

export default class ZombieMap extends React.Component {
  render() {
    return (
      <Map
        style={style}
        containerStyle={mapStyle}
      />
    );
  }
}
