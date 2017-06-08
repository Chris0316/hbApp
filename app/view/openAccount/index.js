/**
 * Created by kim on 2017/6/8.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {CommonStyles, ComponentStyles} from "../../style";
import Navbar from "../../component/navbar";

class OpenAccount extends Component {
  constructor(props) {
    super(props)
  }

  renderNavbar() {
    const {title, router} = this.props;
    return (
      <Navbar
        title={ title }
        leftIconOnPress={ () => router.pop() }/>
    )
  }

  render() {
    const {router} = this.props;
    return (
      <View style={ComponentStyles.container}>
        {this.renderNavbar()}
        <Text style={[CommonStyles.text_danger, CommonStyles.m_t_3]} onPress={() => {
          router.push('phoneNumberVerify')
        }}>Open Account</Text>
      </View>
    )
  }
}

export default OpenAccount;