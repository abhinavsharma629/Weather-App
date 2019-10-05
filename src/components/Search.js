import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";
import Comp from './Comp';

const override = css`
  margin-left: 10%;
  margin-top: 15%;
  display: block;

  border-color: red;
`;

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weatherData: [
        {
          cityName: null,
          coordinates: {
            longitude: null,
            latitude: null
          },
          temp: null,
          pressure: null,
          humidity: null,
          temp_min: null,
          temp_max: null,
          visibility: null
        }
      ],
      loading: false
    };
    this.initialState = this.state;
  }

  onSubmit = e => {
    e.preventDefault();
    const city = this.state.city;
    this.setState(this.initialState);

    this.setState({ loading: true }, () => {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            apiKey
        )
        .then(
          res =>
            this.setState({
              loading: false,
              weatherData: {
                cityName: res.data.name,
                coordinates: {
                  longitude: res.data.coord.lon,
                  latitude: res.data.coord.lat
                },
                temp: res.data.main.temp,
                pressure: res.data.main.pressure,
                humidity: res.data.main.humidity,
                temp_min: res.data.main.temp_min,
                temp_max: res.data.main.temp_max,
                visibility: res.data.visibility
              }
            }),
          () => console.log(this.state)
        );
    });

    this.setState({ city: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <React.Fragment>
        <div>
          <form className="form-inline" style={{ display: "flex"}}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                onChange={this.onChange}
                value={this.state.city}
                style={{ flex: "10", padding: "5px 10px" }}
                size='30'
                className="form-control"
                type="text"
                name="city"
                placeholder="City Name"
              />
            </div>
            <button
              type="submit"
              onClick={this.onSubmit}
              className="btn btn-info mb-2"

            >
              Search
            </button>
          </form>
        </div>
        <div>
          {this.state.loading ? (
            <HashLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              color={"#123abc"}
            />
          ) : (
            <Display details={this.state}/>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const apiKey = "c956e9ddd48de848ff19bc7a256a3f96";

export default Search;
