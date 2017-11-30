import React from "react";
import "./SearchForm.css";
import walkers from "./data/walkers";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infectionStatus: "walker"
    };
  }
  // passInfectionStatusToParent(infectionStatus) {
  //   console.log("Send to parent: ", infectionStatus);
  // }
  onChangeDropDown(event) {
    // if (event.target.value === "human") {
    //   this.setState({ infectionStatus: "human" });
    // }
    // if (event.target.value === "walker") {
    //   this.setState({ infectionStatus: "walker" });
    // }
    // if (event.target.value === "bitten") {
    //   this.setState({ infectionStatus: "bitten" });
    // }
    // if (event.target.value === "dead") {
    //   this.setState({ infectionStatus: "dead" });
    // }
    let trimmedDataArr = [];
    for (let i = 0; i < walkers.length; i++) {
      if (walkers[i].state === event.target.value) {
        trimmedDataArr.push(walkers[i]);
      }
    }
    this.props.sendInfectionStatus(trimmedDataArr);
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <label>
              Search by:
              <select
                defaultValue="walker"
                onChange={event => this.onChangeDropDown(event)}
              >
                <option value="walker">Walker </option>
                <option value="human">Human</option>
                <option value="bitten">Bitten </option>
                <option value="dead">Dead </option>
              </select>
            </label>
          </fieldset>
        </form>
      </div>
    );
  }
}
