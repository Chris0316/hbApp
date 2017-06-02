/**
 * Created by kim on 2017/5/24.
 */
import React, {Component} from "react";
import {Alert, Platform, StyleSheet, View} from "react-native";
import {NavigationActions} from "react-navigation";
import TimerMixin from "react-timer-mixin";
import * as Animatable from "react-native-animatable";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
import Logo from "../component/logo";

import {checkUpdate, downloadUpdate, switchVersion} from "react-native-update";

import _updateConfig from "../../update.json";
const {appKey} = _updateConfig[Platform.OS];

class StartupPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //this.checkUpdate()
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

  componentWillUnmount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  onPageContentShow() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'home', params: {
            title: 'xx'
          }
        })
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