/**
 * Created by kim on 2017/6/8.
 */

import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import {ComponentStyles} from "../style";
import Router from "./router";
import ViewPage from "./view";

const defaultRoute = ViewPage.startup();

class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    this.router = this.router || new Router(navigator);
    let Component = route.component;
    if (Component) {
      return (
        <Component
          {...route.props}
          navigator={ navigator }
          router={this.router}
          ref={(view) => {
            route.sceneRef = view
          } }/>
      )
    }
  }

  onDidFocus(route) {
    if (route.sceneRef.getWrappedInstance) {
      const wrappedComponent = route.sceneRef.getWrappedInstance();
      if (wrappedComponent) {
        wrappedComponent.componentDidFocus && wrappedComponent.componentDidFocus();
      }
    }
    route.sceneRef.componentDidFocus && route.sceneRef.componentDidFocus(route);
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
      <View style={ComponentStyles.container}>
        <StatusBar
          backgroundColor="#000"
          barStyle="light-content"/>
        <Navigator
          initialRoute={ defaultRoute }
          configureScene={ this.configureScene.bind(this) }
          renderScene={ this.renderScene.bind(this) }
          onDidFocus={ this.onDidFocus.bind(this) }>
        </Navigator>
      </View>
    )
  }
}

export default Navigation;
