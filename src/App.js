import React from "react";
import mapboxgl from "mapbox-gl";
import ZombieTable from "./components/ZombieTable/ZombieTable.js";
import "./App.css";
import faker from "faker";
import SearchForm from "./components/SearchForm/SearchForm.js";
import * as actions from "./redux/actions";
import walkers from "./data/walkers";

import { connect } from "react-redux";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zombieData: null,
      flag: false,
      personArray: null
    };
  }

  concatName(firstName, lastName) {
    let completeName = firstName + " " + lastName;
    return completeName;
  }

  populateMap = () => {
    const boundThis = this;
    let personArray = walkers;
    if (personArray === undefined) {
      return;
    }
    if (!this.state.flag) {
      setTimeout(function() {
        boundThis.setState({ flag: true });
        let updatedZombieData = [];
        for (let i = 0; i < personArray.length; i++) {
          updatedZombieData.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [personArray[i].longitude, personArray[i].latitude]
            },
            properties: {
              state: personArray[i].state,
              description: personArray[i].company.toLowerCase(),
              name: boundThis.concatName(
                personArray[i].name.first,
                personArray[i].name.last
              ),
              image: faker.image.avatar(),
              age: personArray[i].age
            }
          });
        }
        boundThis.createMarkerData(updatedZombieData);
      }, 0.75);
    }
    if (this.state.flag) {
      this.filterMarkers();
    }
  };

  filterMarkers() {
    let onlyDisplay = this.props.queryType.queryType;
    const elements = document
      .getElementById("map")
      .getElementsByClassName(`marker`);
    if (elements.length > 0) {
      for (let j = 0; j < elements.length; j++ ) {
        elements[j].classList.remove("hidden")
      }
    }
    if (onlyDisplay === 'none') {
     for (let k = 0; k < elements.length; k++ ) {
        elements[k].classList.remove("hidden")
      }
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].className.includes(onlyDisplay) === false) {
        elements[i].className += " hidden";
      }
    }
  }

  componentWillMount() {
    let zombies = [];
    for (let x = 0; x < walkers.length; x++) {
      if (walkers[x].state === "walker") {
        zombies.push(walkers[x]);
      }
    }
    this.props.dispatch(
      actions.initializePersonArray({
        personArray: zombies
      })
    );
  }

  createMarkerData = walkerArray => {
    let geojson = {
      type: "FeatureCollection",
      features: []
    };
    for (let j = 0; j < walkerArray.length; j++) {
      geojson.features.push(walkerArray[j]);
    }
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-96, 37.8],
      zoom: 3
    });

    geojson.features.forEach(marker => {
      const el = document.createElement("div");
      if (marker.properties.state === "dead") {
        el.className = "marker dead";
      }

      if (marker.properties.state === "walker") {
        el.className = "marker walker";
      }

      if (marker.properties.state === "bitten") {
        el.className = "marker bitten";
      }

      if (marker.properties.state === "human") {
        el.className = "marker human";
      }

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 55 }).setHTML(
            "<h2>" +
              marker.properties.name +
              "</h2>" +
              `<img src=${marker.properties.image} alt="Generated Avatar">` +
              "<p>Age: " +
              marker.properties.age +
              "</p><h3>State: " +
              marker.properties.state +
              "</h3><p>Company: " +
              marker.properties.description +
              "</p>"
          )
        )
        .addTo(map);
    });
    map.addControl(new mapboxgl.NavigationControl());
  };

  render() {
    this.populateMap();
    const style = {
      width: "70%"
    };
    return (
      <div>
        <ZombieTable />
        <SearchForm />
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

const mapStateToProps = state => ({
  personArray: state.personArray,
  queryType: state.queryType
});

export default connect(mapStateToProps)(App);
