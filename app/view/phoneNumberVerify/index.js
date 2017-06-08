/**
 * Created by kim on 2017/6/8.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {CommonStyles, ComponentStyles} from "../../style";
import Navbar from "../../component/navbar";

class PhoneNumberVerify extends Component {
  constructor(props) {
    super(props)
    const {navigator} = this.props;
    this.state = {
      back: navigator.getCurrentRoutes().length > 1
    }
  }
  
  renderNavbar() {
    const {title, router} = this.props;
    let titleText;
    if (title.length < 20) {
      titleText = title;
    } else {
      titleText = title.substring(0, 25) + "...";
    }
    
    return (
      <Navbar
        back={this.state.back}
        title={ titleText }
        leftIconOnPress={ () => router.pop() }/>
    )
  }
  
  render() {
    return (
      <View style={ComponentStyles.container}>
        {this.renderNavbar()}
        <Text style={CommonStyles.text_danger}>验证手机号码</Text>
      </View>
    )
  }
}

export default PhoneNumberVerify;