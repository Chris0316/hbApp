/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {StackNavigator} from "react-navigation";
import startup from "./view/startup";
import home from "./view/home";

class HBApp extends Component {
  render() {
    return (
      <AppNavigator onNavigationStateChange={
        (prevState, currentState) => {
          console.log(123)
        }}/>
    );
  }
}


const AppNavigator = StackNavigator({
  start: {
    screen: startup
  },
  home: {
    screen: home
  }
}, {
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: '#333333',
    showIcon: true
  },
});


export default HBApp