import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Forecast from "./Forecast";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {
        main: '-',
        description: '-',
        temp:  0
      }
    };
  }
  fetchData = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        this.props.zipCode
      },th&units=metric&AppID=fd68c0f2039c5a25f666a9ff374bc93e`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          forecast: {
            main: json.weather[0].main,
            description: json.weather[0].description,
            temp: json.main.temp
          }
        });
      })
      .catch(error => {
        console.warn(error);
      });
  };
  componentDidMount = () => this.fetchData();
  componentDidUpdate = (prevProps) => {
    if(prevProps.zipCode !== this.props.zipCode){
      this.fetchData()
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../bg1.jpg")}
          style={styles.backdorp}
        >
          <View style={styles.top}>
            <Text style={styles.text}>ZipCode is {this.props.zipCode}</Text>
            <Forecast {...this.state.forecast} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  top: {
    backgroundColor: "black",
    flexDirection: "column",
    opacity: 0.4,
    height: "50%"
  },
  backdorp: {
    width: "100%",
    height: "100%"
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    color: "white",
    textAlign: "center"
  }
});
