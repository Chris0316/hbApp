/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {BackHandler, Button, Platform, Text, ToastAndroid, View} from "react-native";
import {ComponentStyles} from "./style";
import {login} from "./service/userService";

export default class HBApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      login: false
    };
    this._onHomeBackPress = this.onHomeBackPress.bind(this);
    this._onExitApp = this.exitApp.bind(this);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onHomeBackPress);
    }
  }

  onHomeBackPress() {
    this.handleHomeBackPress();
    return true;
  }

  handleHomeBackPress() {
    ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
    BackHandler.removeEventListener("hardwareBackPress", this._onHomeBackPress);
    BackHandler.addEventListener("hardwareBackPress", this._onExitApp);
    this.timer = setTimeout(() => {
      clearInterval(this.timer);
      BackHandler.removeEventListener("hardwareBackPress", this._onExitApp);
      BackHandler.addEventListener("hardwareBackPress", this._onHomeBackPress);
    }, 2000);
  }

  exitApp() {
    this.timer && clearTimeout(this.timer);
    BackHandler.exitApp();
  }

  onButtonPress() {
    login('18016052872', '111111').then(res => {
      if (res.code === 0) {
        console.log(res)
        this.setState({'count': ++this.state.count, 'login': true})
      }
    }, err => {
      console.log(err)
    })
  }


  render() {
    return (
      <View style={ComponentStyles.pending_container}>
        <Button style={[ComponentStyles.btn_primary_outline, ComponentStyles.btn]}
                onPress={this.onButtonPress.bind(this)}
                title="Press Me1"
        />
        {this.renderText()}
      </View>
    );
  }

  renderText() {
    if (this.state.login === true) {
      return (
        <Text>Login=>{this.state.count}</Text>
      )
    }
  }
}