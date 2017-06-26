/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {Alert, Image, Platform, StatusBar, StyleSheet, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import * as Animatable from "react-native-animatable";
import SplashScreen from "react-native-splash-screen";
import {StyleConfig} from "../style";

import {checkUpdate, downloadUpdate, switchVersion} from "react-native-update";

import _updateConfig from "../../update.json";
import AV from "leancloud-storage";
import Config from "../config";
const {appKey} = _updateConfig[Platform.OS];

class StartUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routeName: null,
      loading: false
    };
    AV.init({
      appId: Config.leanCloud.appId,
      appKey: Config.leanCloud.appKey
    });
  }

  componentWillMount() {
    this.timer = TimerMixin.setTimeout(() => {
      this.startApp();
    }, 2000)
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.timer && TimerMixin.clearTimeout(this.timer)
  }

  checkUpdate() {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本');
      } else if (info.update) {
        downloadUpdate(info).then(hash => {
          Alert.alert('提示', '应用更新完成，请重启', [
            {
              text: '确定',
              onPress: () => {
                switchVersion(hash);
              }
            }
          ]);
        }).catch(err => {
          Alert.alert('提示', '更新失败.');
        });
      }
    })
  }

  startApp() {
    const {router} = this.props;
    router.resetTo('openAccount');
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Animatable.View animation="fadeIn" style={{position: 'absolute', left: 0, bottom: 80, right: 0, alignItems: 'center'}}>
          <Animatable.Text iterationCount="infinite" animation="pulse">加载中...</Animatable.Text>
        </Animatable.View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container }>
        <StatusBar hidden={true}/>
        <Image source={ require('../image/welcome.png') } style={styles.welcome}/>
        <Animatable.View onAnimationEnd={() => this.setState({loading: true})} animation="fadeInDown" style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={ require('../image/logo.png') } style={[styles.logo]}/>
          {this.renderLoading()}
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleConfig.color_transparent
  },
  welcome: {
    flex: 1,
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height
  },
  logo: {
    width: StyleConfig.avatarSize_lg,
    height: StyleConfig.avatarSize_lg,
    borderRadius: StyleConfig.border_radius
  }
});

export default StartUp;