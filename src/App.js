import React from "react";
import mapboxgl from "mapbox-gl";
import ZombieTable from "./ZombieTable";
import "./App.css";
import faker from 'faker';
import SearchForm from "./SearchForm.js";
import walkers from "./data/walkers";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zombieData: null,
      flag: false
    };
  }

  concatName(firstName, lastName) {
    let completeName = firstName + " " + lastName;
    return completeName;
  }

  populateMap = personArray => { 
    console.log('Data array in map function: ', personArray);
    const boundThis = this;
    if (!this.state.flag) {
      setTimeout(function() {
        boundThis.setState({ flag: true });
        boundThis.setState({ zombieData: personArray });
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
              state: boundThis.state.zombieData[i].state,
              description: boundThis.state.zombieData[i].company.toLowerCase(),
              name: boundThis.concatName(
                boundThis.state.zombieData[i].name.first,
                boundThis.state.zombieData[i].name.last
              ),
              image: faker.image.avatar(),
              age: boundThis.state.zombieData[i].age
            }
          });
        }
        boundThis.createMarkerData(updatedZombieData);
      }, 0.500);
    }
  };

  updateSearchQuery = searchQueryData => {
    this.setState({flag: false})
    console.log('Search Query: ', searchQueryData);
    this.populateMap(searchQueryData);
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
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h2>" +
              marker.properties.name +
              "</h2>" +
              `<img src=${marker.properties.image} alt="Generated Avatar">`             
              + "<p>Age: " + marker.properties.age +
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
    const style = {
      width: "70%"
    };
    return (
      <div>
        <ZombieTable callbackFromParent={this.populateMap} />
        <SearchForm sendInfectionStatus={this.updateSearchQuery}/>
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
