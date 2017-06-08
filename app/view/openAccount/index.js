/**
 * Created by kim on 2017/6/8.
 */

import React, {Component} from "react";
import {Text, View, Button} from "react-native";
import {CommonStyles, ComponentStyles} from "../../style";
import Navbar from "../../component/navbar";
import styles from "./style";

class OpenAccount extends Component {
  constructor(props) {
    super(props);
    const {navigator} = this.props;
    this.state = {
      back: navigator.getCurrentRoutes().length > 1
    }
  }
  
  renderNavbar() {
    const {title, router} = this.props;
    return (
      <Navbar
        back={this.state.back}
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
        <View style={[styles.container]}>
          <Text
            style={[ComponentStyles.btn, ComponentStyles.btn_primary, ComponentStyles.btn_block, CommonStyles.text_white, CommonStyles.text_center]}>我知道了</Text>
        </View>
      
      </View>
    )
  }
}

export default OpenAccount;