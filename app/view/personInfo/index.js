/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Keyboard, ScrollView, StyleSheet, Text, View} from "react-native";
import BaseView from "../BaseView";
import {ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import {Button, CheckBox, InputItem, Link, Steps} from "../../component";
import Picker from "react-native-picker";
import edu from "../../../data/edu.json";
import profession from "../../../data/profession.json";

class PersonInfo extends BaseView {
  constructor(props) {
    super(props);
    this.date_picker = this._createDateData();
    this.state = {
      name: '',
      idCard: '',
      idCardAddress: '',
      idCardGov: '',
      validDate: '',
      address: '',
      postCode: '',
      profession: '',
      education: ''
    }
  }

  _createDateData() {
    let date = [];
    for (let i = 1950; i < 2050; i++) {
      let month = [];
      for (let j = 1; j < 13; j++) {
        let day = [];
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k + '日');
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if (i % 4 === 0) {
            day.push(29 + '日');
          }
        }
        else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
          for (let k = 1; k < 32; k++) {
            day.push(k + '日');
          }
        }
        else {
          for (let k = 1; k < 31; k++) {
            day.push(k + '日');
          }
        }
        let _month = {};
        _month[j + '月'] = day;
        month.push(_month);
      }
      let _date = {};
      _date[i + '年'] = month;
      date.push(_date);
    }
    return date;
  }

  showDatePicker() {
    this.setState({mask: true});
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择日期',
      pickerData: this.date_picker,
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerBg: [255, 255, 255, 1],
      pickerFontColor: [255, 0, 0, 1],
      onPickerConfirm: data => {
        this.setState({
          validDate: data,
          mask: false
        })
      },
      onPickerCancel: data => {
        this.setState({
          mask: false
        })
      }
    });
    Picker.show();
  }

  showEduPicker() {
    this.setState({mask: true});
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择学历',
      pickerData: edu,
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerBg: [255, 255, 255, 1],
      pickerFontColor: [255, 0, 0, 1],
      onPickerConfirm: data => {
        this.setState({
          education: data,
          mask: false
        })
      },
      onPickerCancel: data => {
        this.setState({
          mask: false
        })
      }
    })
    Picker.show();
  }

  showProPicker() {
    this.setState({mask: true});
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择职业',
      pickerData: profession,
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerBg: [255, 255, 255, 1],
      pickerFontColor: [255, 0, 0, 1],
      onPickerConfirm: data => {
        this.setState({
          profession: data,
          mask: false
        })
      },
      onPickerCancel: data => {
        this.setState({
          mask: false
        })
      }
    })
    Picker.show();
  }

  onHideMask() {
    Picker.hide();
  }

  doNext() {
    const {router} = this.props;
    Keyboard.dismiss();
    router.push('setPwd');
  }

  renderBody() {
    return (
      <View style={ComponentStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={[styles.content]}>
          <Steps current={1}/>
          <Text style={SjkhStyles.tips_block}>
            核对身份证正面信息
          </Text>
          <InputItem
            placeholder="请输入真实姓名"
            label="姓名"
            value={this.state.name}
            keyboardType="phone-pad"
            onChange={(t) => this.setState({name: t})}/>
          <InputItem
            placeholder="请输入身份证号"
            label="身份证号"
            value={this.state.idCard}
            onChange={(t) => this.setState({idCard: t})}/>
          <InputItem
            placeholder="请输入身份证地址"
            label="证件地址"
            value={this.state.idCardAddress}
            onChange={(t) => this.setState({idCardAddress: t})}/>
          <Text style={SjkhStyles.tips_block}>
            核对身份证反面信息
          </Text>
          <InputItem
            placeholder="请输入签发机关"
            label="签发机关"
            value={this.state.idCardGov}
            onChange={(t) => this.setState({idCardGov: t})}/>
          <InputItem
            placeholder="请选择"
            label="有效期至"
            type="picker"
            value={this.state.validDate}
            onPress={this.showDatePicker.bind(this)}/>
          <Text style={SjkhStyles.tips_block}>
            其他信息
          </Text>
          <InputItem
            placeholder="请输入通讯地址"
            label="通讯地址"
            value={this.state.address}
            onChange={(t) => this.setState({address: t})}/>
          <InputItem
            placeholder="请输入邮编"
            label="邮编"
            value={this.state.postCode}
            onChange={(t) => this.setState({postCode: t})}/>
          <InputItem
            label="职业"
            placeholder="请选择"
            value={this.state.profession}
            type="picker"
            onPress={this.showProPicker.bind(this)}/>
          <InputItem
            label="学历"
            placeholder="请选择"
            value={this.state.education}
            type="picker"
            onPress={this.showEduPicker.bind(this)}/>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
            <CheckBox checked={true} color="#4883F6"/>
            <Text style={SjkhStyles.link}>已阅读并同意</Text>
            <Link href="setPwd" router={this.props.router}>《电子签名约定书协议》</Link>
            <Link href="http://www.163.com" router={this.props.router}>《中登申请协议》</Link>
          </View>
        </ScrollView>
        <Button type="block" onPress={this.doNext.bind(this)}>下一步</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: StyleConfig.screen_height - StyleConfig.navbar_height - 63
  }
});

export default PersonInfo;