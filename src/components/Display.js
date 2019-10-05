import React, { Component } from "react";
import { Row } from "reactstrap";
import Hover from "./Hover";
import { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactCardFlip from "react-card-flip";
import BackCard from "./BackCard";

//Collapsable Card
const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

export class Display extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      map: false,
      expanded: false,
      favClick: false,
      isFlipped: false,
      anchorEl: null
    };

    this.handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    this.clickMe = data => {
      this.setState({ map: true });
    };

    this.back = () => {
      this.setState({ map: false });
    };

    this.changeState = () => {
      this.setState(state => ({ favClick: !state.favClick }));
    };

    this.handleCardFlip = () => {
      this.setState(state => ({ isFlipped: !state.isFlipped }));
    };
    this.handlePopoverOpen = event => {
      console.log("ues");
      this.setState({ anchorEl: event.currentTarget });
    };

    this.handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };
  }

  //Favourite Icon Color
  col = () => {
    if (this.state.favClick) {
      return {
        color: "red"
      };
    } else {
      return {
        color: "grey"
      };
    }
  };

  render() {
    //Props Details
    const detail = this.props.details.weatherData;

    //If user entered a valid city

    if (detail.cityName != null) {
      // axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+detail.cityName+"&inputtype=textquery&fields=photos&key=AIzaSyCBGUqSvtNu7UChJWhXHz1YmUcWJ69TLPw")
      //   .then(res => {
      //     console.log("Res Data"+" "+this.state.photo_reference+" "+res);
      //   });
      //console.log("Props" + " " + this.props.details);

      //Weather Data
      const text = (
        <Fragment>
          <div className="container">
            <p>
              <i>Longitude:- </i>
              {detail.coordinates.longitude}
            </p>
            <p>
              <i>Latitude:- </i>
              {detail.coordinates.latitude}
            </p>
            <p>
              <i>Temperature:- </i>
              {detail.temp}
            </p>
            <ul>
              <li>
                <i>Minimum:- </i>
                {detail.temp_min}
              </li>
              <li>
                <i>Maximum:- </i>
                {detail.temp_max}
              </li>
            </ul>
            <p>
              <i>Pressure:- </i>
              {detail.pressure}
            </p>
            <p>
              <i>Humidity:- </i>
              {detail.humidity}
            </p>
            <p>
              <i>Visibility:- </i>
              {detail.visibility}
            </p>
          </div>
        </Fragment>
      );

      return (
        <React.Fragment>
          <Row>
            <div className="col-12 col-md-5 m-1">
              <ReactCardFlip
                isFlipped={this.state.isFlipped}
                flipDirection="horizontal"
              >
                <Card key="front">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="City">
                        {detail.cityName.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={detail.cityName + "'s " + "Weather Report"}
                    subheader={new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format(new Date())}
                  />

                  <CardContent onClick={this.handleCardFlip}>
                    <Typography component="div">{text}</Typography>
                  </CardContent>
                  <CardActions disableActionSpacing className={styles.actions}>
                    <IconButton
                      aria-label="Add to favorites"
                      onClick={this.changeState}
                      style={this.col()}
                    >
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>

                    <IconButton
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>

                  <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Hover hoverDetail={this.props.details} />
                    </CardContent>
                  </Collapse>
                </Card>
                <Card key="back">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="City">
                        {detail.cityName.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={detail.cityName + "'s " + "Weather Graph"}
                    subheader={new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format(new Date())}
                  />

                  <div onClick={this.handleCardFlip}>
                    <BackCard city={detail.cityName} />
                  </div>
                </Card>
              </ReactCardFlip>
            </div>
          </Row>
        </React.Fragment>
      );
    } else {
      return <div />;
    }
  }
}

export default Display;
