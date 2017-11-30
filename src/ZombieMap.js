import React from "react";
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
      </div>
    );
  }
}
