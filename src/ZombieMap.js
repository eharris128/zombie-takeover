import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const accessToken =
  "pk.eyJ1IjoiZWNoYXJyaXMxMjgiLCJhIjoiY2phbGd3MThsMnMwODMycnpibjI0cWxnZiJ9._O6xQrMmwIYCR9BCUX_2aA";

const Map = ReactMapboxGl({
  accessToken
});

const mapStyle = {
  height: "50vh",
  width: "50vw"
};

export default class ZombieMap extends React.Component {
sortsZombieCoordinates(zombies) {
  let zombieCoordinates = zombies.map((item, index) => (
    <Feature coordinates={[item.longitude, item.latitude]} />
  ));
  return zombieCoordinates;
}
  render() {
    console.log('This.props: ', this.props.zombieData)
    const zombieProps = this.props.zombieData;
    return (
      <Map style="mapbox://styles/mapbox/streets-v9" containerStyle={mapStyle}>
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {/* <Feature coordinates={[-0.481747846041145, 51.3233379650232]} /> */}
            {this.sortsZombieCoordinates(zombieProps)}  
        </Layer>
      </Map>
    );
  }
}
