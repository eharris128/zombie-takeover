import React from "react";
import "./SearchForm.css";
import walkers from "../../data/walkers";
import * as actions from "../../redux/actions";

import { connect } from "react-redux";

export class SearchForm extends React.Component {
  onChangeDropDown(event) {
    let trimmedDataArr = [];
    for (let i = 0; i < walkers.length; i++) {
      if (walkers[i].state === event.target.value) {
        trimmedDataArr.push(walkers[i]);
      }
    }
    this.props.dispatch(
      actions.updateQueryType({
        queryType: event.target.value
      })
    );
    this.props.dispatch(
      actions.updatePersonArray({
        personArray: trimmedDataArr
      })
    )
  }

  render() {
    return (
      <div className="form-container">
        <form>
          <fieldset>
            <label>
              Search map by:
              <select
                defaultValue="none"
                onChange={event => this.onChangeDropDown(event)}
              >
                <option value="none">-</option>
                <option value="walker">Walker </option>
                <option value="human">Human</option>
                <option value="bitten">Bitten </option>
                <option value="dead">Dead </option>
              </select>
            </label>
          </fieldset>
        </form>
        <em><p>Click on the circles to learn more about each person</p></em>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  queryType: state.queryType
});

export default connect(mapStateToProps)(SearchForm);