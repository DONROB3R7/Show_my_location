import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: false,
      information: ""
    };

    this.showMyLocation = this.showMyLocation.bind(this);
  }

  componentDidMount() {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            information: result
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  showMyLocation() {
    const holdlocation = this.state.location;
    this.setState({
      location: !holdlocation
    });
  }

  render() {
    const holdlocation = this.state.location;
    const holdinformation = this.state.information;
    const holdGoogleMap =
      "http://maps.google.com/?q=" +
      holdinformation.latitude +
      "," +
      holdinformation.longitude;
    return (
      <div className="card">
        <div className="card-body">
          <div className="country">
            <h1>{holdlocation ? holdinformation.country_name : "Country"}</h1>
            <h2>
              Country code : {holdlocation ? holdinformation.country : "Hide"}
            </h2>
          </div>
        </div>
        <div className="info">
          <span>City: {holdlocation ? holdinformation.city : "Hide"}</span>
          <span>Region: {holdlocation ? holdinformation.region : "Hide"}</span>
          <span>
            Currency:{holdlocation ? holdinformation.currency : "Hide"}
          </span>
        </div>
        <div className="ip-info">
          <div>
            <h1>My ip :{holdlocation ? holdinformation.ip : "Hide"}</h1>
          </div>
        </div>
        <div className="ip-info">
          <div>
            <h1>Latitude/Longitude</h1>
            <h2>
              {holdlocation
                ? holdinformation.latitude + "/" + holdinformation.longitude
                : "Hide"}
            </h2>
          </div>
          <div>
            <h1>Google Map</h1>
            <h2>
              <a
                className={this.state.location ? "show" : "hide"}
                href={holdGoogleMap}
                Target="_blank"
              >
                {" "}
                Click here{" "}
              </a>
              {this.state.location ? "" : "Hide"}
            </h2>
          </div>
        </div>
        <span onClick={this.showMyLocation} className="button">
          {this.state.location ? "Hide My Location" : "Show My Location"}
        </span>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
