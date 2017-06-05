/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Button, DeviceEventEmitter, ScrollView, StatusBar, Text, View} from "react-native";
import {CommonStyles, ComponentStyles} from "../style";
import config from "../config";
import {decodeHTML} from "../common";
import HtmlConvertor from "../component/htmlConvertor";
import HomeRender from "../component/header/home";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userAction from "../action/user";
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: '',
      login: false
    }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('login', (flag) => {
      this.setState({
        login: true
      })
    })
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('login');
  }

  componentWillReceiveProps(nextProps) {
    let {user} = nextProps;
    if (user) {
      this.setState({
        login: user.login
      })
    }
  }

  openWeb() {
    let url = 'http://www.163.com'
    this.props.navigation.navigate('web', {
      url: url
    })
  }

  showHtml() {
    let html = decodeHTML(config.news);
    if (this.state.html) {
      this.setState({
        html: ''
      })
    } else {
      this.setState({
        html: html
      })
    }
  }

  renderHTML() {
    if (this.state.html) {
      return (
        <ScrollView>
          <View style={ [CommonStyles.p_a_3] }>
            <HtmlConvertor
              navigate={ this.props.navigation.navigate }
              content={ this.state.html }>
            </HtmlConvertor>
          </View>
        </ScrollView>
      )
    }
  }

  gotoLogin() {
    this.props.navigation.navigate('login', {
      title: '登录',
      callback: (res) => {
        this.setState({
          login: true
        })
      }
    })
  }

  doLogout() {
    const {userAction} = this.props;
    userAction.logout();
  }

  renderLogin() {
    if (this.state.login === false) {
      return (
        <Button onPress={this.gotoLogin.bind(this)} title='登录'/>
      )
    }
  }

  renderLogout() {
    if (this.state.login === true) {
      return (
        <Button onPress={this.doLogout.bind(this)} title='退出'/>
      )
    }
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        <StatusBar
          translucent={ true }
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"/>
        <HomeRender navigate={ this.props.navigation.navigate }>
          {this.renderLogin()}
          {this.renderLogout()}
          <Text onPress={() => {
            this.openWeb()
          }}>Open Web</Text>
          <Text style={{fontSize: 50, color: 'red'}} onPress={this.showHtml.bind(this)}>显示更多内容</Text>
          {this.renderHTML()}
        </HomeRender>
      </View>
    )
  }
}

export default connect(state => ({
  user: state.user
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch)
}))(Home)