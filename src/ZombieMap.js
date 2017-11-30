import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "./ZombieMap.css";
import mapboxgl from "mapbox-gl";

const accessToken =
  "pk.eyJ1IjoiZWNoYXJyaXMxMjgiLCJhIjoiY2phbGd3MThsMnMwODMycnpibjI0cWxnZiJ9._O6xQrMmwIYCR9BCUX_2aA";

const Map = ReactMapboxGl({
  accessToken
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWNoYXJyaXMxMjgiLCJhIjoiY2phbGd3MThsMnMwODMycnpibjI0cWxnZiJ9._O6xQrMmwIYCR9BCUX_2aA";

const mapStyle = {
  height: "50vh",
  width: "50vw"
};

var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California"
      }
    }
  ]
};

export default class ZombieMap extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9"
    });
    map.addControl(new mapboxgl.NavigationControl());
    geojson.features.forEach(function(marker) {
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>')).addTo(map);
    });
  }

  // sortsZombieCoordinates(zombies) {
  //   let zombieCoordinates = zombies.map((item, index) => (
  //     <Feature key={index} coordinates={[item.longitude, item.latitude]} />
  //   ));
  //   return zombieCoordinates;
  // }

  render() {
    const style = {
      position: "absolute",
      top: 300,
      bottom: 0,
      width: "100%"
    };
    const zombieProps = this.props.zombieData;
    return (
      <div>
        {/* <Map
          zoom={[1]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={mapStyle}
        >
          <Layer type="circle" id="stuff" className="walker-location">
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            {this.sortsZombieCoordinates(zombieProps)}
          </Layer>
        </Map> */}
        <div style={style} ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}
