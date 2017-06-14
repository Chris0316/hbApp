/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
class Button extends Component {
  constructor(props) {
    super(props);
  }

  renderBlock() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ StyleConfig.touchable_press_opacity}
        onPress={onPress}>
        <View style={CommonStyles.flexItemsMiddle}>
          <Text style={[ComponentStyles.btn, styles.btn, styles.btn_block]}>
            { this.props.children }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderPrimary() {
    const {onPress, style} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ StyleConfig.touchable_press_opacity}
        onPress={onPress}>
        <View style={CommonStyles.flexItemsMiddle}>
          <Text style={[ComponentStyles.btn, styles.btn, style]}>
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
    backgroundColor: StyleConfig.color_primary,
    color: StyleConfig.color_white,
    width: StyleConfig.screen_width - (StyleConfig.space_3 * 2),
    marginTop: StyleConfig.space_4,
    textAlign: 'center'
  },
  btn_block: {
    width: StyleConfig.screen_width,
    borderRadius: 0
  }
});

export default Button;