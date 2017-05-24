/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

import * as Animatable from "react-native-animatable";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
import Logo from "../component/logo";
import Router from '../component/router'
class StartupPage extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null
  });
  
  constructor(props) {
    super(props);
    this.router = new Router(this.props.navigation)
  }
  
  onPageContentShow() {
    this.timer = setTimeout(() => {
      // this.props.navigation.navigate('Home')
    }, 2000);
  }
  
  onPress() {
    this.props.navigation.navigate('home')
  }
  
  renderContent() {
    return (
      <Animatable.View
        onAnimationEnd={this.onPageContentShow.bind(this)}
        animation="fadeInDown">
        <Logo/>
        <Text onPress={this.onPress.bind(this)}>Start...</Text>
      </Animatable.View>
    )
  }
  
  render() {
    return (
      <View
        style={ [ComponentStyles.container, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle, styles.container] }>
        { this.renderContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height
  }
});

export default StartupPage