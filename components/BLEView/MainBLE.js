/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ScanBLE from './ScanBLE'
export default class MyComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScanBLE/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
