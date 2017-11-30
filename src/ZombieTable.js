import React, { Component } from "react";
import logo from "./warning.svg";
import "./ZombieTable.css";
import walkers from "./data/walkers";

export default class ZombieTable extends Component {
  concatName(firstName, lastName) {
    let completeName = firstName + " " + lastName;
    return completeName;
  }
  passZombieDataToParent(zombies) {
    this.props.callbackFromParent(zombies);
  }
  render() {
    let zombies = [];
    for (let i = 0; i < walkers.length; i++) {
      if (walkers[i].state === "walker") {
        zombies.push(walkers[i]);
      }
    }
    let trimmedData = [];
    for (let j = 0; j < 10; j++) {
      trimmedData.push(walkers[j]);
    }
    const walkerData = trimmedData.map((item, index) => (
      <tr key={index}>
        <th>{this.concatName(item.name.first, item.name.last)}</th>
        <th>{item.state}</th>
        <th>{item.age}</th>
        <th>{item.company.toLowerCase()}</th>
      </tr>
    ));
    this.passZombieDataToParent(zombies);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Breaking News!</h1>
        </header>
        <div>
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
