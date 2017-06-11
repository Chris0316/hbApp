/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Text, TextInput, View, Keyboard} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import Btn from "../../component/button";
import Toast from "@remobile/react-native-toast";
import BaseView from "../BaseView";

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
      <View style={[CommonStyles.background_white, CommonStyles.p_a_2, CommonStyles.flexRow]}>
        <Text style={{height: 30, fontSize: 16, lineHeight: 26, marginRight: 12}}>手机号码</Text>
        <TextInput
          maxLength={11}
          selectionColor={StyleConfig.color_black}
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
          autoFocus={true}
          value={this.state.phone}
          onChangeText={(text) => this.setState({'phone': text})}
          style={[CommonStyles.flex_1, ComponentStyles.input]}
          placeholder='请输入手机号'
        />
      </View>
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