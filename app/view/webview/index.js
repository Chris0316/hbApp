/**
 * Created by kim on 2017/5/25.
 */
import React from "react";
import {StyleSheet, View, WebView} from "react-native";
import Toast from "@remobile/react-native-toast";
import TimerMixin from "react-timer-mixin";
import BaseView from "../BaseView";
import {Spinner} from "../../component";
import {ComponentStyles, StyleConfig} from "../../style";

const loadTimeout = 6000;

class WebScene extends BaseView {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: this.props.title
    };
  }

  componentWillUnmount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  onError() {
    Toast.show("加载外部链接失败");
    this.setWebViewLoaded();
  }

  onLoadStart() {
    this.timer = TimerMixin.setTimeout(() => {
      if (this.state.loaded === false) {
        Toast.show("页面响应不太给力");
      }
      this.setWebViewLoaded();
      TimerMixin.clearTimeout(this.timer);
    }, loadTimeout);
  }

  onLoadEnd(e) {
    const title = e.nativeEvent.title;
    this.setWebViewLoaded();
    this.setState({
      title: title
    });
  }

  setWebViewLoaded() {
    this.setState({
      loaded: true
    });
  }

  renderLoading() {
    if (this.state.loaded === false) {
      return (
        <Spinner style={ [ComponentStyles.pending_container, styles.pending] }/>
      );
    }
  }

  renderWebView() {
    const {url} = this.props;
    return (
      <WebView
        source={{uri: url}}
        onError={ this.onError.bind(this)}
        onLoadEnd={this.onLoadEnd.bind(this)}
        onLoadStart={ this.onLoadStart.bind(this)}
      />
    );
  }

  renderBody() {
    return (
      <View style={ [ComponentStyles.container] }>
        { this.renderWebView() }
        { this.renderLoading() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pending: {
    top: StyleConfig.navbar_height,
    height: StyleConfig.screen_height - (StyleConfig.navbar_height * 3),
    backgroundColor: 'transparent'
  }
});

export default WebScene;