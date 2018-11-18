import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import MainBLE from './components/BLEView/MainBLE';

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      screens: " "
    };
  }
  render() {
    return (
      <MainBLE/>
    );
  }
}
