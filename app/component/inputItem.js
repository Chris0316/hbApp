/**
 * Created by Vickey on 2017/6/10.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import Icon from "react-native-vector-icons/Ionicons";
import {CommonStyles, StyleConfig} from "../style";
class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: false,
      secureTextEntry: this.props.secureTextEntry,
      sms_start: this.props.start || false,
      sms_again: false,
      sms_countdown: this.props.countdown || 60
    }
  }

  componentDidMount() {
    if (this.state.sms_start === true) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.timer && TimerMixin.clearInterval(this.timer);
  }

  renderLabel() {
    const {label} = this.props;
    return (
      <Text style={styles.label}>{label}</Text>
    )
  }

  renderEyeIcon() {
    let secureTextEntry = this.state.secureTextEntry;
    if (secureTextEntry === undefined) {
      return
    }
    let icon = 'ios-eye-outline';
    if (secureTextEntry === false) {
      icon = 'ios-eye-off-outline';
    }
    if (secureTextEntry !== undefined) {
      return (
        <TouchableOpacity style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            onPress={this.toggleIput.bind(this)}
            name={ icon }
            size={ 24 }
            color={ StyleConfig.color_icon }/>
        </TouchableOpacity>
      )
    }
  }

  renderClearIcon() {
    let clear = this.state.clear;
    if (clear === true) {
      return (
        <TouchableOpacity style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            onPress={this.clearInput.bind(this)}
            name={ 'ios-close-circle-outline' }
            size={ StyleConfig.icon_size }
            color={ StyleConfig.color_icon }/>
        </TouchableOpacity>
      )
    }
  }

  toggleIput() {
    let se = this.state.secureTextEntry;
    this.setState({
      secureTextEntry: !se
    })
  }

  clearInput() {
    const {onChange} = this.props;
    this.setState({
      clear: false
    });
    onChange && onChange('');
  }

  onChange(text) {
    const {onChange} = this.props;
    if (text) {
      this.setState({
        clear: true
      })
    } else {
      this.setState({
        clear: false
      })
    }
    onChange && onChange(text)
  }

  renderInput() {
    const {maxLength, keyboardType, value, placeholder, autoFocus, defaultValue} = this.props;
    return (
      <View
        style={[CommonStyles.flexRow, CommonStyles.flex_1, CommonStyles.flexItemsMiddle]}>
        <TextInput
          maxLength={maxLength}
          selectionColor={StyleConfig.color_black}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          autoFocus={autoFocus}
          value={value}
          secureTextEntry={this.state.secureTextEntry}
          defaultValue={defaultValue}
          onChangeText={this.onChange.bind(this)}
          style={styles.value}
          placeholder={placeholder}
        />
        {this.renderClearIcon()}
        {this.renderEyeIcon()}
      </View>
    )
  }

  renderPicker() {
    const {value, placeholder, onPress} = this.props;
    let str = placeholder;
    if (value) {
      str = value;
    }
    return (
      <TouchableOpacity
        style={[CommonStyles.flexRow, CommonStyles.flex_1, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter]}
        onPress={onPress}>
        <Text style={styles.value}>{str}</Text>
        <Icon
          style={{width: 30, textAlign: 'center'}}
          name={ 'ios-arrow-down-outline' }
          size={ StyleConfig.icon_size }
          color={StyleConfig.color_icon }/>
      </TouchableOpacity>
    )
  }

  startTimer() {
    let cd = this.state.sms_countdown;
    this.timer = TimerMixin.setInterval(() => {
      if (cd === 1 && this.timer) {
        TimerMixin.clearInterval(this.timer);
        this.setState({
          sms_start: false,
          sms_countdown: this.props.countdown || 60,
          sms_again: true
        });
      } else {
        this.setState({
          sms_countdown: --cd
        })
      }
    }, 1000);
  }

  resetSmsCode() {
    if (this.state.sms_start === true) {
      return;
    }
    this.setState({
      sms_start: true
    });
    this.startTimer();
  }

  renderSmsBtn() {
    let label = '立即获取';
    if (this.state.sms_start) {
      label = this.state.sms_countdown + 's后重发';
    } else if (this.state.sms_again) {
      label = '重新获取';
    }
    return (
      <TouchableOpacity onPress={this.resetSmsCode.bind(this)}>
        <Text style={styles.sms_btn}>{label}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const {type} = this.props;
    if (type === 'picker') {
      return (
        <View style={styles.input_item}>
          {this.renderLabel()}
          {this.renderPicker()}
        </View>
      )
    } else if (type === 'sms') {
      return (
        <View style={styles.input_item}>
          {this.renderLabel()}
          {this.renderInput()}
          {this.renderSmsBtn()}
        </View>
      )
    } else {
      return (
        <View style={styles.input_item}>
          {this.renderLabel()}
          {this.renderInput()}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  input_item: {
    flexDirection: 'row',
    padding: StyleConfig.space_2,
    backgroundColor: StyleConfig.color_white,
    borderBottomWidth: StyleConfig.border_width,
    borderBottomColor: StyleConfig.border_color,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    width: 60,
    marginRight: 12,
    height: 30,
    lineHeight: 24
  },
  value: {
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    padding: 0
  },
  sms_btn: {
    backgroundColor: StyleConfig.color_white,
    fontSize: 12,
    paddingTop: 4,
    paddingBottom: 4,
    width: 75,
    borderRadius: StyleConfig.border_radius,
    borderWidth: StyleConfig.border_width,
    borderColor: StyleConfig.border_color,
    textAlign: 'center'
  }
});

export default InputItem