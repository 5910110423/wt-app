import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import Forecast from './Forecast';

export default class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            forecast:{
                main:'main',
                description:'description',
                temp : 0
            }
        };
    }

    fetchData = () =>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.zipCode},th&units=metric&APPID=fd68c0f2039c5a25f666a9ff374bc93e`)
        .then((response)=> response.json())
        .then((json)=>{
            console.log(json)
            this.setState(
                {
                    forecast : {
                        main : json.weather[0].main,
                        description : json.weather[0].description,
                        temp : json.main.temp
                    }
                });
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    
    componentDidMount = ()=> this.fetchData() 
    // componentDidUpdate = (prevProps) => {
    //     if(prevProps.zipCode !== this.props.zipCode){
    //       this.fetchData()
    //     }
    //   }

render() {
    return (
      <View style={styles.container}>
      <ImageBackground source = {require('../bg1.jpg')} style={styles.backdrop}>
        <View style={styles.top}>
            <Text style={styles.text} >Zip code is {this.props.zipCode}.</Text>
            {console.log("test")}
            <Forecast {...this.state.forecast}/>
        </View>
      </ImageBackground>
      </View>
    );  
  }
}



const styles = StyleSheet.create({
    container: {
      paddingTop:10
    },
    backdrop : {
      width: '100%',
      height: '100%'
    },
    top: {
        backgroundColor: "black",
        flexDirection: "column",
        opacity: 0.5,
        height: "50%"
    },
    text: {
        fontSize: 20,
        marginTop: 20,
        color: "white",
        textAlign: "center",
      }
});
