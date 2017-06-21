/**
 * Created by kim on 2017/6/16.
 */

import React from "react";
import {Text, View} from "react-native";
import {ComponentStyles} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import {Button, CheckBox, InputItem, Link} from "../../component";
import BaseView from "../BaseView";

class PhoneToukerRegister extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      smsCode: ''
    }
  }

  renderBody() {
    const {router} = this.props;
    return (
      <View style={ComponentStyles.container}>
        <Text style={SjkhStyles.tips_block}>
          短信已发送至188****6666
        </Text>
        <InputItem
          type="sms"
          maxLength={4}
          placeholder="请输入验证码"
          start={true}
          label="验证码"
          value={this.state.smsCode}
          keyboardType="numeric"
          onChange={(t) => this.setState({smsCode: t})}/>
        <InputItem
          placeholder="登录密码由6-20位英文，数字组成"
          label="登录密码"
          secureTextEntry={true}
          value={this.state.password}
          keyboardType="numeric"
          onChange={(t) => this.setState({password: t})}/>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10
        }}>
          <CheckBox checked={true} color="#4883F6"/>
          <Text style={SjkhStyles.link}>已阅读并同意</Text>
          <Link href="http://10.0.31.109/h5" router={this.props.router} title="用户协议">《投客网用户协议》</Link>
        </View>
        <Button onPress={() => router.push('uploadPhoto')}>下一步</Button>
      </View>
    )
  }
}

export default PhoneToukerRegister;