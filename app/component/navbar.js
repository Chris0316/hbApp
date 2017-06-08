import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {CommonStyles, StyleConfig} from "../style";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  renderLeftContentText() {
    const {title} = this.props;
    if (!title) {
      return;
    }
    let titleText;
    if (title.length < 20) {
      titleText = title;
    } else {
      titleText = title.substring(0, 25) + "...";
    }
    return (
      <Text style={ [CommonStyles.text_gray, CommonStyles.font_sm, CommonStyles.background_transparent, CommonStyles.flex_1] }>
        { titleText }
      </Text>
    )
  }

  renderLeftContentIcon() {
    const {leftIconName = 'ios-arrow-round-back'} = this.props;
    if (leftIconName) {
      return (
        <Icon
          name={ leftIconName }
          size={ StyleConfig.icon_size }
          style={ [CommonStyles.m_r_2, CommonStyles.background_transparent] }
          color={ StyleConfig.color_primary }/>
      )
    }
  }

  renderLeftContent() {
    const {leftIconOnPress} = this.props;
    return (
      <TouchableOpacity
        style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }
        activeOpacity={ StyleConfig.touchable_press_opacity }
        onPress={ () => leftIconOnPress() }>
        { this.renderLeftContentIcon() }
        { this.renderLeftContentText() }
      </TouchableOpacity>
    )
  }

  renderRightContentIcon() {
    const {rightIconName} = this.props;
    if (rightIconName) {
      return (
        <Icon
          name={ rightIconName }
          size={ StyleConfig.icon_size }
          style={ [CommonStyles.background_transparent] }
          color={ StyleConfig.color_white }/>
      )
    }
  }

  renderRightContentText() {
    const {rightText = ''} = this.props;
    if (rightText) {
      return (
        <Text style={[CommonStyles.text_white, CommonStyles.font_xs, CommonStyles.m_l_1]}>
          { rightText }
        </Text>
      )
    }
  }

  renderRightContent() {
    const {rightIconOnPress = (() => null)} = this.props;
    return (
      <TouchableOpacity
        style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.p_l_2] }
        activeOpacity={ StyleConfig.touchable_press_opacity }
        onPress={ () => rightIconOnPress() }>
        { this.renderRightContentIcon() }
        { this.renderRightContentText() }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={ [CommonStyles.border_b, CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsBottom, CommonStyles.pos_absolute, styles.container] }>
        { this.renderLeftContent() }
        { this.renderRightContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: StyleConfig.navbar_height,
    width: StyleConfig.screen_width,
    paddingVertical: StyleConfig.space_2 + 2,
    paddingHorizontal: StyleConfig.space_3,
    backgroundColor: '#fff'
  }
});

export default Navbar;
