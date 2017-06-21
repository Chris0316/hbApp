/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StyleConfig} from "../style";
class Button extends Component {
  constructor(props) {
    super(props);
    let disabled = this.props.disabled;
    this.state = {
      activeOpacity: disabled === true ? 1 : StyleConfig.touchable_press_opacity
    }
  }

  handlePress() {
    const {onPress, disabled, loading} = this.props;
    if (!disabled && loading !== true) {
      onPress.call(this)
    }
  }

  renderBlock() {
    const {disabled, style} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ this.state.activeOpacity}
        onPress={this.handlePress.bind(this)}>
        <View style={[styles.btn, disabled ? styles.btn_disabled : styles.btn_common, styles.btn_block, style]}>
          <Text style={[styles.btn_text]}>
            { this.props.children }
          </Text>
          {this.renderLoadingIcon()}
        </View>
      </TouchableOpacity>
    )
  }

  renderLoadingIcon() {
    if (this.props.loading === true) {
      return (
        <ActivityIndicator color="#fff"/>
      )
    } else {
      return (
        <Text style={{width: 20}}></Text>
      )
    }
  }

  renderPrimary() {
    const {disabled, style} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={ this.state.activeOpacity}
        onPress={this.handlePress.bind(this)}>
        <View style={[styles.btn, disabled ? styles.btn_disabled : styles.btn_common, style]}>
          <Text style={[styles.btn_text]}>
            { this.props.children }
          </Text>
          {this.renderLoadingIcon()}
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
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_common: {
    backgroundColor: StyleConfig.color_primary,
  },
  btn_disabled: {
    backgroundColor: StyleConfig.color_disabled,
  },
  btn_text: {
    color: StyleConfig.color_white,
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    paddingLeft: 20
  },
  btn_block: {
    width: StyleConfig.screen_width,
    borderRadius: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0
  },
  loading: {
    width: 20,
    height: 20,
  }
});

export default Button;