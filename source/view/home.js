/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {ComponentStyles} from "./style";

class Home extends Component {
  render() {
    return (
      <View style={ComponentStyles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}
export  default Home;