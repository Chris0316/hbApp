/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {ScrollView, StatusBar, Text, View} from "react-native";
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
      html: ''
    }
  }

  openWeb() {
    let url = 'http://www.163.com'
    this.props.navigation.navigate('web', {
      url: url
    })
  }

  doLogin() {
    const {userAction} = this.props;
    userAction.reqLogin('18016052872', '111111')
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

  renderLoading() {
    const {user} = this.props;
    if (user.loading === true) {
      return (
        <Text style={{fontSize: 50, color: 'red'}}>Loading...</Text>
      )
    } else {
      return (
        <Text style={{fontSize: 50, color: 'green'}}>Loading...</Text>
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
          <Text onPress={() => {
            this.openWeb()
          }}>Open Web</Text>
          <Text style={{fontSize: 50, color: 'red'}} onPress={this.showHtml.bind(this)}>显示更多内容</Text>
          <Text onPress={this.doLogin.bind(this)}>登录1</Text>
          {this.renderHTML()}
          {this.renderLoading()}
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