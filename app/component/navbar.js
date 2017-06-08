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
  
  
  renderTitle() {
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
      <Text
        style={ [this.props.back ? styles.back : '',
          CommonStyles.text_dark, CommonStyles.text_center,
          CommonStyles.font_sm, CommonStyles.background_transparent, styles.title] }>
        { titleText }
      </Text>
    )
  }
  
  renderLeftContentIcon() {
    const {back, leftIconName = 'ios-arrow-back-outline'} = this.props;
    if (back) {
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
      </TouchableOpacity>
    )
  }
  
  renderRightContentIcon() {
    const {rightIconName = ''} = this.props;
    if (rightIconName) {
      return (
        <Icon
          name={ rightIconName }
          size={ StyleConfig.icon_size }
          style={ [CommonStyles.background_transparent] }
          color={ StyleConfig.color_primary }/>
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
      </TouchableOpacity>
    )
  }
  
  render() {
    return (
      <View
        style={ [CommonStyles.border_b, CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsBottom, CommonStyles.pos_absolute, styles.container] }>
        { this.renderLeftContent() }
        { this.renderTitle() }
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
    paddingBottom: StyleConfig.space_1 + 2,
    paddingHorizontal: StyleConfig.space_2,
    backgroundColor: '#fff'
  },
  title: {
    flex: 1
  },
  back: {
    marginLeft: -StyleConfig.icon_size
  }
});

export default Navbar;
