import React, { Component } from "react";
import axios from "axios";
import { HashLoader, ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Chart } from "react-google-charts";

const override = css`
  margin-left: 45%;
  margin-top: 15%;
  display: block;

  border-color: red;
`;

export default class GraphComponent extends Component {
  state = {
    weather: [
      {
        date: null,
        temp: null
      }
    ]
  };

  //Get Data On Component Mount
  componentDidMount = () => {
      
    this.setState({ loading: true }, () => {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
            this.props.city +
            "&units=metric&appid=" +
            apiKey
        )
        .then(res => {
          this.setState({
            loading: false,
            weather: res.data.list.map(function(data) {
              var wData = {
                date: data.dt_txt,
                temp: data.main.temp
              };
              return wData;
            })
          });
        });
    });
  };

  render() {
    if (this.props.city) {
      if (this.state.loading) {
        return (
          <HashLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#123abc"}
          />
        );
      } else {
       
        if (this.state.weather.length === 40) {
          //console.log(this.state.weather);
          var arr = [];
          const xaxis = ["x", "Latest Temp. Available", "Temperature"];

          const tempData = this.state.weather.map(function(item) {
            arr = [new Date(item.date), item.temp, item.temp];
            return arr;
          });

          
          const data = [xaxis, ...tempData.slice(33, 41)];
          //console.log(data);
          var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ];

          return (
            <Chart
              width={"600px"}
              height={"400px"}
              chartType="LineChart"
              loader={
                <ScaleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={20}
                  color={"#123abc"}
                />
              }
              data={data}
              options={{
                hAxis: {
                  title: days[arr[0].getDay()]
                },
                vAxis: {
                  title: "Temperature"
                }
              }}
            />
          );
        } else {
          return <div />;
        }
      }
    } else {
      return <div />;
    }
  }
}
const apiKey = "c956e9ddd48de848ff19bc7a256a3f96";
