/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Keyboard, Text, View} from "react-native";
import {CommonStyles} from "../../style";
import Btn from "../../component/button";
import Toast from "@remobile/react-native-toast";
import BaseView from "../BaseView";
import InputItem from "../../component/inputItem";

class PhoneNumberVerify extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      phone: '18016052872'
    }
  }
  
  renderTip() {
    return (
      <View>
        <Text style={[CommonStyles.text_black, CommonStyles.p_a_2, CommonStyles.font_xs]}>
          若开户未完成可用通过手机号继续开户
        </Text>
      </View>
    )
  }
  
  renderInput() {
    return (
      <InputItem
        label="手机号码"
        placeholder="请输入手机号"
        maxLength={11}
        keyboardType="phone-pad"
        value={this.state.phone}
        onChange={(text) => this.setState({'phone': text})}
      />
    )
  }
  
  doNext() {
    if (!this.state.phone) {
      Toast.show('请输入手机号码');
      return;
    }
    const {router} = this.props;
    Keyboard.dismiss();
    router.push('personInfo')
  }
  
  renderBody() {
    return (
      <View>
        {this.renderTip()}
        {this.renderInput()}
        <Btn onPress={this.doNext.bind(this)}>下一步</Btn>
      </View>
    )
  }
}

export default PhoneNumberVerify;