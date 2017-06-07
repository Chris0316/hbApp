/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {BackHandler, Platform} from "react-native";
import Toast from "@remobile/react-native-toast";
import {StackNavigator} from "react-navigation";
import TimerMixin from "react-timer-mixin";
import * as View from "./view";

class HBApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: null
    };
    this._onHomeBackPress = this.onHomeBackPress.bind(this);
    this._onExitApp = this.exitApp.bind(this);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onHomeBackPress);
    }
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return 'start';
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  onHomeBackPress() {
    let routerName = this.getCurrentRouteName(this.state.currentState)
    if (routerName !== 'start' && routerName !== 'home') {
      this.navigator && this.navigator._navigation.goBack();
      return true;
    }
    this.handleHomeBackPress();
    return true;
  }

  handleHomeBackPress() {
    if (Platform.OS === "android") {
      Toast.show("再按一次退出应用");
      BackHandler.removeEventListener("hardwareBackPress", this._onHomeBackPress);
      BackHandler.addEventListener("hardwareBackPress", this._onExitApp);
      this.timer = TimerMixin.setInterval(() => {
        this.timer && TimerMixin.clearInterval(this.timer);
        BackHandler.removeEventListener("hardwareBackPress", this._onExitApp);
        BackHandler.addEventListener("hardwareBackPress", this._onHomeBackPress);
      }, 2000);
    }
  }

  exitApp() {
    this.timer && TimerMixin.clearTimeout(this.timer);
    BackHandler.exitApp();
  }

  render() {
    let app = this;
    return (
      <AppNavigator
        ref={nav => this.navigator = nav}
        onNavigationStateChange={
          (prevState, currentState) => {
            app.setState({
              currentState: currentState
            })
          }}
      />
    );
  }
}


const AppNavigator = StackNavigator({
  start: {
    screen: View.start,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  home: {
    screen: View.home,
    navigationOptions: ({navigation}) => ({
      title: '主页',
      header: null
    })
  },
  login: {
    screen: View.login,
    navigationOptions: ({navigation}) => ({
      title: '登录'
    })
  },
  web: {
    screen: View.web,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'white'},
      title: navigation.state.params.title
    })
  },
  camera:{
    screen: View.camera,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'white'},
      title: '拍照'
    })
  }
}, {
  headerMode: 'none',
  mode: 'card'
});


export default HBApp