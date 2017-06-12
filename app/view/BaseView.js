/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {ComponentStyles, StyleConfig} from "../style";
import Navbar from "../component/navbar";
class BaseView extends Component {

  constructor(props) {
    super(props);
    const {navigator} = this.props;
    this.back = navigator.getCurrentRoutes().length > 1;
    this.state = {
      help: false,
      mask: false
    };
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderNavbar() {
    const {title, router} = this.props;
    return (
      <Navbar
        back={this.back} title={ title }
        leftIconOnPress={ () => router.pop() }
        rightIconOnPress={() => this.setState({help: true, mask: true})}/>
    )
  }

  renderHelp() {
    let help = this.state.help;
    if (help === true) {
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

  renderMask() {
    let mask = this.state.mask;
    if (mask === true) {
      return (
        <Text style={styles.mask} onPress={this.hideMask.bind(this)}></Text>
      )
    }
  }

  hideMask() {
    this.setState({
      mask: false,
      help: false
    });
    this.onHideMask();
  }

  onHideMask() {

  }

  render() {
    return (
      <View style={[ComponentStyles.container]}>
        <View style={[ComponentStyles.container]}>
          {this.renderNavbar()}
          {this.renderBody()}
        </View>
        {this.renderMask()}
        {this.renderHelp()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height,
    backgroundColor: 'rgba(0,0,0,.6)'
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

export default BaseView