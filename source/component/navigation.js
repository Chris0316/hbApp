/**
 * Created by Vickey on 2017/5/24.
 */
import React, {Component} from "react";
import {StackNavigator} from "react-navigation";
import Start from "../view/startup";
import Home from "../view/home";


class App extends Component {
  
  render() {
    return (
      <AppNavigator ref={nav => {
        this.navigator = nav;
      }}/>
    );
  }
}

const AppNavigator = StackNavigator({
  start: {
    screen: Start
  },
  home: {
    screen: Home
  }
});

export default App