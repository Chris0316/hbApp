/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Keyboard, Text, View} from "react-native";
import {CommonStyles} from "../../style";
import {Button, InputItem} from "../../component";
import FormView from "../common/FormView";

class PhoneNumberVerify extends FormView {
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

  validator() {
    if (!this.state.phone) {
      return '请输入手机号码'
    }
    return true;
  }

  onSubmit() {
    const {router} = this.props;
    Keyboard.dismiss();
    router.push('phoneToukerRegister')
  }

  renderBody() {
    return (
      <View>
        {this.renderTip()}
        {this.renderInput()}
        <Button onPress={this.onSubmit.bind(this)}>下一步</Button>
      </View>
    )
  }
}

export default PhoneNumberVerify;