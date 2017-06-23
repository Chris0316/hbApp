/**
 * Created by kim on 2017/6/14.
 */
import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import FormView from "../common/FormView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import {Button, CheckBox, InputItem, Link, Steps} from "../../component";
class ThirdDepository extends FormView {
  constructor(props) {
    super(props);
    this.state = {
      bank: {}
    }
  }

  showBankList() {
    let {router} = this.props;
    router.push('banks', {
      callback: (bank) => {
        this.setState({
          bank: bank
        })
      },
      bankcode: this.state.bank.bankcode
    });
  }

  onSubmit() {
    const {router} = this.props;
    router.push('uploadPhoto')
  }

  renderBody() {

    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[styles.content]} keyboardShouldPersistTaps={'always'}>
          <Steps current={2}/>
          <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1]}>
            开通三方存管后，您的资金可以在银行卡与交易账户中自由调度
          </Text>
          <InputItem
            type="picker" label="选择银行" placeholder="请选择存管银行"
            value={this.state.bank.bankname}
            onPress={this.showBankList.bind(this)}/>
          <InputItem
            label="银行卡号" placeholder="请输入银行卡号" maxLength={10}
            onChange={(t) => this.setState({bankId: t})}/>
          <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1, styles.tips]}>
            温馨提示:{'\n'}
            您选择的银行不支持同一张银行卡在多家券商办理三方存管，如该银行卡已在其他券商办理三方存管业务，请您使用另一张银行卡办理。
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10
          }}>
            <CheckBox checked={true} color="#4883F6"/>
            <Text style={SjkhStyles.link}>已阅读并同意</Text>
            <Link href="http://www.touker.com" router={this.props.router}>《投客网用户协议》</Link>
          </View>
          <Button onPress={this.onSubmit.bind(this)}>下一步</Button>
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