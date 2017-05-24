/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {ComponentStyles} from "../style";
import Router from '../component/router'
class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '主页'
  });
  
  constructor(props) {
    super(props);
    this.router = new Router(this.props.navigation)
  }
  
  render() {
    return (
      <View style={ComponentStyles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}
export  default Home;