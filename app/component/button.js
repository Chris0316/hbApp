/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
class Button extends Component {
  constructor(props) {
    super(props);
    let disabled = this.props.disabled;
    this.state = {
      activeOpacity: disabled === true ? 1 : StyleConfig.touchable_press_opacity
    }
  }
  
  handlePress() {
    const {onPress, disabled} = this.props;
    if (!disabled) {
      onPress.call(this)
    }
  }
  
  renderBlock() {
    const {disabled, style} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ this.state.activeOpacity}
        onPress={this.handlePress.bind(this)}>
        <View style={CommonStyles.flexItemsMiddle}>
          <Text
            style={[ComponentStyles.btn, styles.btn, styles.btn_block, style, disabled ? ComponentStyles.btn_disabled : styles.btn_common]}>
            { this.props.children }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  renderPrimary() {
    const {style, disabled} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ this.state.activeOpacity}
        onPress={this.handlePress.bind(this)}>
        <View style={CommonStyles.flexItemsMiddle}>
          <Text
            style={[ComponentStyles.btn, styles.btn, style, disabled ? ComponentStyles.btn_disabled : styles.btn_common]}>
            { this.props.children }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  renderPlain() {
    return (
      <Text>{ this.props.children }</Text>
    )
  }
  
  render() {
    const {type} = this.props;
    if (type === 'block') {
      return this.renderBlock();
    } else if (type === 'plain') {
      return this.renderPlain();
    } else {
      return this.renderPrimary();
    }
  }
}

const styles = StyleSheet.create({
  btn: {
    width: StyleConfig.screen_width - (StyleConfig.space_3 * 2),
    marginTop: StyleConfig.space_4,
    textAlign: 'center'
  },
  btn_common: {
    backgroundColor: StyleConfig.color_primary,
    color: StyleConfig.color_white,
  },
  btn_block: {
    width: StyleConfig.screen_width,
    borderRadius: 0
  }
});

export default Button;