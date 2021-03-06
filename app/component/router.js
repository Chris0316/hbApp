import React, {BackHandler, Platform} from "react-native";
import Toast from "@remobile/react-native-toast";
import TimerMixin from "react-timer-mixin";
import ViewPage from "./view";
import * as RouterSceneConfig from "../config/routerScene";

class Router {
  constructor(navigator) {
    this.navigator = navigator;
    this._onHomeBackPress = this.onHomeBackPress.bind(this);
    this._onExitApp = this.exitApp.bind(this);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._onHomeBackPress);
    }
  }

  onHomeBackPress() {
    const currentRoute = this.getCurrentRoute();
    const routeName = currentRoute.name;
    if (routeName === 'web') {
      const webview = currentRoute.sceneRef.refs['webview'];
      if (currentRoute.sceneRef.state.canGoBack) {
        webview.goBack();
      } else {
        this.navigator.pop();
      }
      return true;
    } else if (routeName !== 'openAccount') {
      this.navigator.pop();
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
        TimerMixin.clearInterval(this.timer);
        BackHandler.removeEventListener("hardwareBackPress", this._onExitApp);
        BackHandler.addEventListener("hardwareBackPress", this._onHomeBackPress);
      }, 2000);
    }
  }

  exitApp() {
    this.timer && TimerMixin.clearTimeout(this.timer);
    BackHandler.exitApp();
  }

  getRouteList() {
    return this.navigator.getCurrentRoutes();
  }

  getCurrentRoute() {
    const routesList = this.getRouteList();
    return routesList[routesList.length - 1];
  }

  getPreviousRoute() {
    const routesList = this.getRouteList();
    return routesList[routesList.length - 2];
  }

  getNavigator() {
    return this.navigator;
  }

  setRoute(route, props = {}) {
    route.props = props;
    route.sceneConfig = route.sceneConfig ? route.sceneConfig : RouterSceneConfig.customPushFromRight;
    route.component = route.component;
  }

  pop() {
    this.navigator.pop();
  }

  popN(n) {
    this.navigator.popN(n);
  }

  push(routeName, props = {}) {
    const {route, options} = ViewPage.getRoute(routeName);
    props = Object.assign({}, props, options);
    this.setRoute(route, props);
    this.navigator.push(route);
  }

  replace(route, props = {}) {
    this.setRoute(route, props);
    this.navigator.replace(route);
  }

  resetTo(routeName, props = {}) {
    const {route, options} = ViewPage.getRoute(routeName);
    props = Object.assign({}, props, options);
    this.setRoute(route, props);
    this.navigator.resetTo(route);
  }

  replacePrevious(route, props = {}) {
    this.setRoute(route, props);
    this.navigator.replacePrevious(route);
  }

  replacePreviousAndPop(route, props = {}) {
    this.setRoute(route, props);
    this.navigator.replacePreviousAndPop(route);
  }

  replaceAtIndex(route, index, props = {}) {
    this.setRoute(route, props);
    this.navigator.replaceAtIndex(route, index)
  }
}

export default Router;
