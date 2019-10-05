import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

//Map Marker
const AnyReactComponent = ({ text }) => (
  <div>
    <b>{text}</b>
  </div>
);

export class Hover extends Component {
  render() {
    const detail = this.props.hoverDetail.weatherData;

    if (detail.cityName != null) {
      const position = [
        detail.coordinates.latitude,
        detail.coordinates.longitude
      ];
      return (
        <React.Fragment>
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCBGUqSvtNu7UChJWhXHz1YmUcWJ69TLPw"
              }}
              defaultCenter={position}
              defaultZoom={11}
            >
              <AnyReactComponent
                lat={detail.coordinates.latitude}
                lng={detail.coordinates.longitude}
                text="Marker"
              />
            </GoogleMapReact>
          </div>
        </React.Fragment>
      );
    } else {
      return <div />;
    }
  }
}
export default Hover;
