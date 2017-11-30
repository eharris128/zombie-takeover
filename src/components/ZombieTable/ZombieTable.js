import React, { Component } from "react";
import logo from "../../warning.svg";
import "./ZombieTable.css";
import walkers from "../../data/walkers";

import { connect } from "react-redux";

export class ZombieTable extends Component {
  concatName(firstName, lastName) {
    let completeName = firstName + " " + lastName;
    return completeName;
  }

  render() {
    let trimmedData = [];
    let counter = 0;
    while (counter < 10) {
      trimmedData.push(walkers[counter]);
      // for random individual approach:
      // trimmedData.push(walkers[Math.floor(Math.random() * 100)])
      counter++;
    }

    const walkerData = trimmedData.map((item, index) => (
      <tr className="table-body-row" key={index}>
        <td className="name">
          {this.concatName(item.name.first, item.name.last)}
        </td>
        <td className={item.state}>{item.state}</td>
        <td className="age">{item.age}</td>
        <td className="company">{item.company.toLowerCase()}</td>
      </tr>
    ));
    let zombies = [];
    for (let i = 0; i < walkers.length; i++) {
      if (walkers[i].state === "walker") {
        zombies.push(walkers[i]);
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Zombie Outbreak Tracker</h1>
        </header>
        <div className="table-container">
          <h2 className="info">
            Key information on 10 individuals involved in zombie outbreak.
          </h2>
          <p>
            Please see the map for more details on all individuals involved in
            the pandemic.
          </p>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Status</th>
                <th>Age</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>{walkerData}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  personArray: state.personArray
});

export default connect(mapStateToProps)(ZombieTable);
