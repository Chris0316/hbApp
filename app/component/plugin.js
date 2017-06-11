import React, {Component} from "react";
import {StatusBar, View} from "react-native";
class Plugin extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <StatusBar
          translucent={ false }
          backgroundColor="red"
          barStyle="light-content"/>
      </View>
    );
  }
}

export default Plugin;



