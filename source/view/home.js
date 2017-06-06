/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Button, StatusBar, View} from "react-native";
import {ComponentStyles} from "../style";
import HomeRender from "../component/header/home";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userAction from "../action/user";
class Home extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
  
  }
  
  componentWillUnmount() {
  }
  
  componentWillReceiveProps(nextProps) {
  }
  
  gotoLogin() {
    this.props.navigation.navigate('login', {
      title: '登录'
    })
  }
  
  doLogout() {
    const {userAction} = this.props;
    userAction.logout();
  }
  
  renderLogin() {
    let {user} = this.props;
    if (user && !user.login) {
      return (
        <Button onPress={this.gotoLogin.bind(this)} title='登录1'/>
      )
    }
  }
  
  renderLogout() {
    let {user} = this.props;
    if (user && user.login === true) {
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