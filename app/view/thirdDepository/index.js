/**
 * Created by kim on 2017/6/14.
 */


import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import BaseView from "../BaseView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import InputItem from "../../component/inputItem";
import Steps from "../../component/steps";
import CheckBox from "../../component/checkbox";
import Btn from "../../component/button";
import Link from "../../component/link";
class ThirdDepository extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      bank: '建设银行',
      bankId: ''
    }
  }

  renderBody() {
    const {router} = this.props;
    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[styles.content]} keyboardShouldPersistTaps={'always'}>
          <Steps current={2}/>
          <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1]}>
            开通三方存管后，您的资金可以在银行卡与交易账户中自由调度
          </Text>
          <InputItem
            type="picker" label="选择银行" placeholder="请选择存管银行"
            onPress={() => this.router.push('banks')}/>
          <InputItem
            label="银行卡号" placeholder="请输入银行卡号" maxLength={10}
            onChange={(t) => this.setState({bankId: t})}/>
          <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1, styles.tips]}>
            温馨提示:{'\n'}
            您选择的银行不支持同一张银行卡在多家券商办理三方存管，如该银行卡已在其他券商办理三方存管业务，请您使用另一张银行卡办理。
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
            <CheckBox checked={true} color="#4883F6"/>
            <Text style={SjkhStyles.link}>已阅读并同意</Text>
            <Link href="http://www.touker.com" router={this.props.router}>《投客网用户协议》</Link>
          </View>
          <Btn>下一步</Btn>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tips: {
    color: StyleConfig.color_primary
  }
});
export default ThirdDepository;