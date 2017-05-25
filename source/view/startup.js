/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {NavigationActions} from "react-navigation";
import TimerMixin from "react-timer-mixin";
import * as Animatable from "react-native-animatable";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
import Logo from "../component/logo";
class StartupPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  onPageContentShow() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'home'})
      ]
    })
    this.timer = TimerMixin.setTimeout(() => {
      this.props.navigation.dispatch(resetAction)
    }, 300)
  }

  renderContent() {
    return (
      <Animatable.View
        onAnimationEnd={this.onPageContentShow.bind(this)}
        animation="fadeInDown">
        <Logo/>
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