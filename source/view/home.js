/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {ComponentStyles} from "../style";
class Home extends Component {

  constructor(props) {
    super(props);
  }

  openWeb() {
    let url = 'http://www.163.com'
    this.props.navigation.navigate('web', {
      url: url
    })
  }

  render() {
    return (
      <View style={ComponentStyles.container}>
        <Text onPress={() => {
          this.openWeb()
        }}>Home</Text>
      </View>
    )
  }
}
export  default Home;