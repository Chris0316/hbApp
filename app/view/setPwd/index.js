/**
 * Created by kim on 2017/6/13.
 */

import React from "react";
import {ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import BaseView from "../BaseView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import {Button, InputItem, Steps} from "../../component";
class SetPwd extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      tradePwd: '',
      assetPwd: '',
      same: false
    }
  }

  renderAssetPwd() {
    let same = this.state.same;
    if (same === false) {
      return (
        <View>
          <InputItem
            maxLength={6}
            placeholder="请输入6位数字资金密码"
            label="资金密码"
            secureTextEntry={true}
            value={this.state.assetPwd}
            keyboardType="numeric"
            onChange={(t) => this.setState({assetPwd: t})}/>
          <Text style={SjkhStyles.tips_block}>资金密码在进行资金转入和转出时使用</Text>
        </View>
      )
    }
  }

  renderBody() {
    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[styles.content]} keyboardShouldPersistTaps={'always'}>
          <Steps current={1}/>
          <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1]}>
            设置的密码适用于华宝证券各交易平台
          </Text>
          <InputItem
            maxLength={6}
            placeholder="请输入6位数字交易密码"
            label="交易密码"
            secureTextEntry={true}
            value={this.state.tradePwd}
            keyboardType="numeric"
            onChange={(t) => this.setState({tradePwd: t})}/>
          <View style={ComponentStyles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderBottomWidth: 1, borderBottomColor: StyleConfig.border_color, padding: 10, backgroundColor: StyleConfig.color_white}}>
              <Text style={{flex: 1}}>资金密码与交易密码相同</Text>
              <Switch
                onTintColor="#44DB5E"
                thumbTintColor="#fff"
                onValueChange={(value) => this.setState({same: value})}
                style={{width: 80}}
                value={this.state.same}/>
            </View>
          </View>
          {this.renderAssetPwd()}
          <Button onPress={() => this.props.router.push('thirdDepository')}>确定</Button>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: StyleConfig.screen_height
  }
});

export default SetPwd