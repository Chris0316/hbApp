/**
 * Created by kim on 2017/5/25.
 */
import React from "react";
import {ActivityIndicator, StyleSheet, View, WebView} from "react-native";
import Toast from "@remobile/react-native-toast";
import BaseView from "../BaseView";
import {ComponentStyles, StyleConfig} from "../../style";

class WebScene extends BaseView {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      canGoBack: false
    };
  }

  componentWillUnmount() {
  }

  leftIconOnPress() {
    const {router} = this.props;
    if (this.state.canGoBack) {
      this.refs['webview'].goBack();
    } else {
      router.pop();
    }
  }

  onError() {
    Toast.show("加载外部链接失败");
  }

  onLoadEnd(e) {
    const title = e.nativeEvent.title;
    if (!title || title.indexOf('http') === 0) {
      return;
    }
    this.setState({
      title: title
    });
  }

  /**
   * 获取H5页面发送的消息
   * @param e
   */
  onMessage(e) {
    let data = e.nativeEvent.data;
    if (data) {
      let message = JSON.parse(data);
      if (message.action === 'config') {//配置app
        let params = message.params;
        if (params.navbar) {
          this.setState({
            navbar_backgroundColor: params.navbar.backgroundColor,
            navbar_color: params.navbar.color
          })
        }
      } else if (message.action === 'callNative') {//打开原生页面
        const {router} = this.props;
        let routerName = message.routerName;
        let callback = message.callback;
        router.push(routerName, message.params);
        if (callback) {
          //执行回调方法
          this.refs['webview'].injectJavaScript('window["' + callback + '"]();');
        }
      }
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  renderLoading() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          animating={ true }
          size={ 'large' }
          color={ StyleConfig.color_primary }
        />
      </View>
    );
  }

  renderWebView() {
    const {url} = this.props;
    return (
      <WebView
        ref="webview"
        source={{uri: url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        injectedJavaScript="window."
        renderLoading={this.renderLoading.bind(this)}
        onMessage={this.onMessage.bind(this)}
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={ this.onError.bind(this)}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }

  renderBody() {
    return (
      <View style={ [ComponentStyles.container] }>
        { this.renderWebView() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: -30
  }
});

export default WebScene;