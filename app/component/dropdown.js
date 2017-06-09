/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {StyleConfig} from "../style";
class DropDown extends Component {
  constructor(props) {
    super(props);
  }

  hideMenu() {
    this.setState({
      showHelp: false
    })
  }

  renderBackDrop() {
    let {showHelp, onPress} = this.props;
    if (showHelp === true) {
      return (
        <TouchableWithoutFeedback onPress={() => onPress()}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
      )
    }
  }

  renderMenu() {
    let {showHelp} = this.props;
    if (showHelp === true) {
      return (
        <View style={styles.dropdown}>
          <View style={styles.item}>
            <Image source={require('../image/sjkh/wx.png')} style={styles.item_icon}/>
            <Text style={styles.item_text}>在线客服</Text>
          </View>
          <View style={styles.item}>
            <Image source={require('../image/sjkh/phone.png')} style={styles.item_icon}/>
            <Text style={styles.item_text}>服务热线</Text>
          </View>
          <View style={styles.item}>
            <Image source={require('../image/sjkh/question.png')} style={styles.item_icon}/>
            <Text style={styles.item_text}>常见问题</Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        {this.renderBackDrop()}
        {this.renderMenu()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: StyleConfig.color_transparent,
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height
  },
  dropdown: {
    position: 'absolute',
    right: 10,
    top: 30,
    width: 120,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: StyleConfig.border_width,
    borderColor: StyleConfig.border_color
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: StyleConfig.border_width,
    borderBottomColor: StyleConfig.border_color,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_icon: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  item_text: {
    textAlign: 'center',
    fontSize: StyleConfig.font_xs
  }
});

export default DropDown