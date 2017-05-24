/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {BackHandler, Image, Modal, NetInfo, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import * as Animatable from "react-native-animatable";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";

class StartupPage extends Component {
  constructor(props) {
    super(props);
  }

  onPageContentShow() {
    this.timer = TimerMixin.setTimeout(() => {
      this.checkUserToken();
    }, 300);
  }

  renderContent() {
    return (
      <Animatable.View
        onAnimationEnd={() => this.onPageContentShow() }
        animation="fadeInDown">
        <Logo />
      </Animatable.View>
    )
  }

  render() {
    return (
      <View style={ [ComponentStyles.container, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle, styles.container] }>
        { this.renderContent() }
      </View>
    );
  }
}