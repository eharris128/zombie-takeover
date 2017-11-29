import React, { Component } from 'react';
import logo from './warning.svg';
import './App.css';
import walkers from './data/walkers';
import zombie from './img/zombies.jpg';
import buttons from './img/buttons.jpg';
import walkersjson from './img/walkersjson.jpg';
import zombietable from './img/zombietable.jpg';
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Breaking News!</h1>
        </header>
        <img className="zombie-img" src={zombie}/>
        <div className="App-summary">
          <code>
              Zombies have taken over the city!
              <br /><br />
              You've been tasked with creating a Zombie watch dashboard to keep tabs on the zombies walking in the city.<br />
              <br /><br />
              Quickly parse the json file to find out who is still human and who you need to quarantine.<br/><br/>(walkers.js)
              <img className="dashboard-img" src={walkersjson}/>
              <br /><br />

              The walkers.js file contains the "people" to display.<br /><br />
              Display all "people" in a tabular format with the columns <ul><li>"Full Name"</li><li>"Status"</li><li>"Age"</li><li>"Company"</li></ul>
              <br /><br />
              Status should be displayed as a color coded tag (Example below).
              <br /><br />
              </code>

              <img className="buttons-img" src={buttons}/>
              <code>
              human(green)<br /><br />
              bitten(yellow)<br /><br />
              dead(black)<br /><br />
              walker(red)<br /><br />
              <br /><br />
              Use any frameworks you find helpful e.g. react-bootstrap
              <br /><br />
              <br /><br />

              </code>
          </div>
          <div>
          <code style={{color: 'red', fontSize: '16px'}}>Your solution should look similar to this: (note: pagination not required.)
          <br /><br />
          **BONUS** If you have time display the users on a mapbox map 
          </code>
          </div>
          <img className="zombie-table-img" src={zombietable}/>
      </div>
    );
  }
}

export default App;
