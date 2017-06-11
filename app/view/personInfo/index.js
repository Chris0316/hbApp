/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import Btn from "../../component/button";
import BaseView from "../BaseView";
import {ScrollView, Text, View} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import InputItem from '../../component/inputItem';
import Picker from 'react-native-picker';
import area from '../../../data/area.json';

let p = null;

class PersonInfo extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '1983年,2月,17日',
      selectedAddress: ''
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
  
  _createAreaData() {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
        let _city = {};
        _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
        city.push(_city);
      }
      
      let _data = {};
      _data[area[i]['name']] = city;
      data.push(_data);
    }
    return data;
  }
  
  showPicker() {
    let data = [];
    for (var i = 0; i < 100; i++) {
      data.push(i);
    }
    if (p) {
      p.show();
      return;
    }
    p = Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择日期',
      pickerData: this._createDateData(),
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerBg: [255, 255, 255, 1],
      pickerFontColor: [255, 0, 0, 1],
      selectedValue: ['1983年', '2月', '17日'],
      onPickerConfirm: data => {
        this.setState({
          selectedValue: data
        })
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      }
    });
    Picker.show();
  }
  
  showAddressPicker() {
    Picker.isPickerShow(status=>{
      alert(status)
    });
    // Picker.toggle();
    // Picker.init({
    //   pickerConfirmBtnText: '确定',
    //   pickerCancelBtnText: '取消',
    //   pickerTitleText: '请选择地址',
    //   pickerData: this._createAreaData(),
    //   pickerToolBarFontSize: 16,
    //   pickerFontSize: 16,
    //   pickerBg: [255, 255, 255, 1],
    //   pickerFontColor: [255, 0, 0, 1],
    //   selectedValue: ['河北', '唐山', '古冶区'],
    //   onPickerConfirm: pickedValue => {
    //     this.setState({
    //       selectedAddress: pickedValue
    //     })
    //   },
    //   onPickerCancel: pickedValue => {
    //     console.log('area', pickedValue);
    //   },
    //   onPickerSelect: pickedValue => {
    //     //Picker.select(['山东', '青岛', '黄岛区'])
    //     console.log('area', pickedValue);
    //   }
    // });
    // Picker.show();
  }
  
  renderBody() {
    const {router} = this.props;
    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[styles.content]}>
          <InputItem placeholder="请输入手机号码"
                     label="手机号码"
                     keyboardType="phone-pad"
                     onChange={(t) => console.log(t)}/>
          <InputItem placeholder="请输入手机号码"
                     label="手机号码"
                     onChange={(t) => console.log(t)}/>
          <InputItem placeholder="请选择日期"
                     label="日期"
                     type="picker"
                     value={this.state.selectedValue}
                     onPress={this.showPicker.bind(this)}/>
          <InputItem placeholder="请选择地址"
                     label="地址"
                     type="picker"
                     value={this.state.selectedAddress}
                     onPress={this.showAddressPicker.bind(this)}/>
        </ScrollView>
        <Btn type="block">保存</Btn>
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