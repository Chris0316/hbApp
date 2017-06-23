/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {View} from "react-native";

import {ComponentStyles, StyleConfig} from "../../style";
import Navbar from "../../component/navbar";
import Help from "../../component/help";

class BaseView extends Component {

  constructor(props) {
    super(props);
    const {navigator, router} = this.props;
    this.back = navigator.getCurrentRoutes().length > 1;
    this.routerName = router.getCurrentRoute().name;
    this.close = this.routerName === 'web';
    this.state = {
      showHelp: false,
      title: ' ',
      navbar_backgroundColor: '#fff',
      navbar_color: StyleConfig.color_black
    }
  }

  componentDidMount() {
    this.setState({
      //页面标题
      title: this.props.title,
      //导航栏背景色
      navbar_backgroundColor: this.props.navbar_backgroundColor,
      //导航栏字体颜色
      navbar_color: this.props.navbar_color
    })
  }

  leftIconOnPress() {
    const {router} = this.props;
    router.pop()
  }

  closeIconOnPress() {
    const {router} = this.props;
    router.pop()
  }

  renderNavbar() {
    return (
      <Navbar
        back={this.back}
        close={this.close}
        backgroundColor={this.state.navbar_backgroundColor}
        color={this.state.navbar_color}
        title={ this.state.title }
        leftIconOnPress={ this.leftIconOnPress.bind(this) }
        closeIconOnPress={ this.closeIconOnPress.bind(this) }
        rightIconOnPress={() => this.setState({showHelp: true})}/>
    )
  }

  render() {
    return (
      <View style={[ComponentStyles.container]}>
        <View style={[ComponentStyles.container]}>
          {this.renderNavbar()}
          {this.renderBody()}
        </View>
        <Help show={this.state.showHelp} onHide={() => this.setState({showHelp: false})}/>
      </View>
    )
  }
}

export default BaseView;