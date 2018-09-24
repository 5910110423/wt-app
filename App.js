import React from 'react';
import Weather from './components/Weather'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <Weather zipCode = "90110"/>
    );
  }
}


