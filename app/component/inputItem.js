/**
 * Created by Vickey on 2017/6/10.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
class InputItem extends Component {
  constructor(props) {
    super(props)
  }
  
  renderLabel() {
    const {label} = this.props;
    return (
      <Text style={styles.label}>{label}</Text>
    )
  }
  
  renderInput() {
    const {maxLength, keyboardType, value, placeholder, onChange, autoFocus} = this.props;
    return (
      <TextInput
        maxLength={maxLength}
        selectionColor={StyleConfig.color_black}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        autoFocus={autoFocus}
        value={value}
        onChangeText={(text) => onChange(text)}
        style={[CommonStyles.flex_1, ComponentStyles.input]}
        placeholder={placeholder}
      />
    )
  }
  
  renderPicker() {
    const {value, placeholder, onPress} = this.props;
    let str = placeholder;
    if (value) {
      str = value;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.value]}>{str}</Text>
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