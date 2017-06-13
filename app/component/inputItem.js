/**
 * Created by Vickey on 2017/6/10.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: false,
      secureTextEntry: this.props.secureTextEntry
    }
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
    onChange('');
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
    onChange(text)
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
          style={[CommonStyles.flex_1, ComponentStyles.input]}
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
        <Text style={[styles.value, CommonStyles.flex_1]}>{str}</Text>
        <Icon
          style={{width: 30, textAlign: 'center'}}
          name={ 'ios-arrow-down-outline' }
          size={ StyleConfig.icon_size }
          color={StyleConfig.color_icon }/>
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
    borderBottomColor: StyleConfig.border_color
  },
  label: {
    height: 30,
    fontSize: 16,
    lineHeight: 26,
    marginRight: 12,
    width: 80
  },
  value: {
    height: 30,
    fontSize: 16,
    lineHeight: 26,
    marginRight: 12,
    flex: 1
  }
});

export default InputItem