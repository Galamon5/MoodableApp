import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Button
} from "react-native";
import { List, ListItem } from "react-native-elements";
import { BleManager, Device, BleError, LogLevel } from "react-native-ble-plx";

type Props = {};

type State = {
  text: Array<string>
};

function arrayBufferToHex(buffer) {
  if (!buffer) return null;
  const values = new Uint8Array(buffer);
  var string = "";
  for (var i = 0; i < values.length; i += 1) {
    const num = values[i].toString(16);
    string += num.length == 1 ? "0" + num : num;
  }
  return string;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: []
    };
  }

  componentDidMount() {
    const manager = new BleManager();
    searchDevice = () =>{
      manager.onStateChange(newState => {
        if (newState != "PoweredOn") return;
        this._log("Started scanning...");
        manager.startDeviceScan(
          null,
          {
            allowDuplicates: false
          },
          (error, device) => {
            if (error) {
              this._logError("SCAN", error);
              return;
            }
            this._log(device.name,device.id, device);
          }
        );
      }, true);
    }
    connDevice = (item) =>{
      manager.stopDeviceScan();
      manager.connectToDevice(item)
      .then((device) => {
          return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        device.isConnected().then((res)=>alert(res))
      })
      .catch((error) => {
          // Handle errors
      });
    }
  }

  _log = (name: string, id: string, ...args) => {
    const message = {
      name: name,
      id: id,
    };
    this.setState({
      text: [message, ...this.state.text]
    });
  };

  _logError = (tag: string, error: BleError) => {
    this._log(
      tag +
        "ERROR(" +
        error.errorCode +
        "): " +
        error.message +
        "\nREASON: " +
        error.reason +
        " (att: " +
        error.attErrorCode +
        ", ios: " +
        error.iosErrorCode +
        ", and: " +
        error.androidErrorCode +
        ")"
    );
  };

  delay = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        <Button
          onPress={() => {
            this.setState({
              text: []
            });
          }}
          title={"Clear"}
        />
        <Button
          onPress={() => {
            searchDevice()
          }}
          title={"Buscar"}
        />
          <FlatList
            style={styles.container}
            data={this.state.text}
            renderItem={({ item }) => (
          <ListItem
          onPress={() => {
            connDevice(item.id)
          }}
            title={item.name}
            subtitle={item.id}
          />
        )}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
