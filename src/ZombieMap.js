import React from "react";
<<<<<<< HEAD
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
=======
import mapboxgl from "mapbox-gl";
import App from "./App";
import "./ZombieMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class ZombieMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zombieData: null,
      flag: false,
      geojson: {
        type: "FeatureCollection",
        features: []
      }
    };
  }

  retrieveZombieData = dataFromChild => {
    const boundThis = this;
    if (!this.state.flag) {
      setTimeout(function() {
        boundThis.setState({ zombieData: dataFromChild });
        console.log("We got da zombies: ", dataFromChild);
        boundThis.setState({ flag: true });
        // console.log("Look at state: ", boundThis.state.zombieData);
        let updatedZombieData = [];
        for (let i = 0; i < boundThis.state.zombieData.length; i++) {
          updatedZombieData.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                boundThis.state.zombieData[i].longitude,
                boundThis.state.zombieData[i].latitude
              ]
            },
            properties: {
              title: boundThis.state.zombieData[i].state,
              description: boundThis.state.zombieData[i].company.toLowerCase()
            }
          });
        }
        console.log('Updated zombie data: ', updatedZombieData);
        //  boundThis.setState({ geojson });
      }, 3000);
    }
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-96, 37.8],
      zoom: 3
    });

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

    geojson.features.forEach(function(marker) {
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" +
              marker.properties.title +
              "</h3><p>" +
              marker.properties.description +
              "</p>"
          )
        )
        .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl());
  }

  render() {
    const style = {
      width: "70%"
    };
    return (
      <div>
        <App callbackFromParent={this.retrieveZombieData} />
        <div className="container">
          <div
            style={style}
            id="map"
            ref={el => (this.mapContainer = el)}
            className="absolute top right left bottom"
          />
        </div>
>>>>>>> feature/map
      </div>
    );
  }
}
