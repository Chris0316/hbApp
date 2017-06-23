/**
 * Created by kim on 2017/6/23.
 */

import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {StyleConfig} from "../style";

class Help extends Component {

  constructor(props) {
    super(props);
  }

  renderHelp() {
    const {show, onHide} = this.props;
    if (show) {
      return (
        <View style={styles.mask}>
          <Text style={styles.mask} onPress={onHide}></Text>
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
        </View>
      )
    }
  }

  render() {
    if (this.props.show) {
      return (
        this.renderHelp()
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height,
    backgroundColor: 'transparent'
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

export default Help