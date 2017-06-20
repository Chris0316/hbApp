/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {CommonStyles, ComponentStyles, StyleConfig} from "../style";
const Loading = require('../image/loading.gif');
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
        <View style={[styles.btn]}>
          <Text
            style={[disabled ? ComponentStyles.btn_disabled : styles.btn_common]}>
            { this.props.children }
          </Text>
          <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
            <Image source={Loading} style={[styles.loading]}/>
          </View>
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
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: StyleConfig.color_primary,
    borderRadius: 4,
    flexDirection: 'row'
  },
  btn_common: {
    color: StyleConfig.color_white,
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: -20,
    flex: 1
  },
  btn_block: {
    width: StyleConfig.screen_width,
    borderRadius: 0
  },
  loading: {
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    marginLeft: 20
  }
});

export default Button;