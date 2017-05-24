/**
 * Created by Vickey on 2017/5/24.
 */

import React, {
  Platform,
  BackHandler,
  ToastAndroid
} from 'react-native';

export default class Router {
  constructor(navigator) {
    this.navigator = navigator;
    this._onHomeBackPress = this.onHomeBackPress.bind(this);
    this._onExitApp = this.exitApp.bind(this);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onHomeBackPress);
    }
  }
  
  onHomeBackPress() {
    let routerName = this.navigator.state.routeName;
    if (routerName !== 'start') {
      this.navigator.goBack();
      return true;
    }
    
    this.handleHomeBackPress();
    return true;
  }
  
  handleHomeBackPress() {
    if (Platform.OS === "android") {
      ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT);
      BackHandler.removeEventListener("hardwareBackPress", this._onHomeBackPress);
      BackHandler.addEventListener("hardwareBackPress", this._onExitApp);
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        BackHandler.removeEventListener("hardwareBackPress", this._onExitApp);
        BackHandler.addEventListener("hardwareBackPress", this._onHomeBackPress);
      }, 2000);
    }
  }
  
  exitApp() {
    this.timer && clearTimeout(this.timer);
    BackHandler.exitApp();
  }
}