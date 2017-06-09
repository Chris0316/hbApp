import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
      <TouchableOpacity
        style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.background_transparent, CommonStyles.flex_1] }>
        <Text
          style={ [this.props.back ? styles.back : '',
            CommonStyles.text_dark, CommonStyles.text_center, CommonStyles.font_sm, CommonStyles.flex_1] }>
          { titleText }
        </Text>
      </TouchableOpacity>
    )
  }

  renderLeftContent() {
    const {back, leftIconOnPress} = this.props;
    if (back) {
      return (
        <TouchableOpacity
          style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }
          activeOpacity={ StyleConfig.touchable_press_opacity }
          onPress={ () => leftIconOnPress() }>
          <Image source={require('../image/sjkh/back.png')} style={styles.nav_icon}/>
        </TouchableOpacity>
      )
    }
  }

  renderRightContentIcon() {
    return (
      <Image source={require('../image/sjkh/custom.png')} style={styles.nav_icon}/>
    )
  }

  renderRightContent() {
    const {rightIconOnPress} = this.props;
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
        style={ [CommonStyles.border_b, CommonStyles.flexRow, CommonStyles.pos_absolute, styles.container] }>
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
    paddingHorizontal: StyleConfig.space_2,
    backgroundColor: '#fff'
  },
  back: {
    marginLeft: -StyleConfig.icon_size
  },
  nav_icon: {
    width: 21,
    height: 21
  }
});

export default Navbar;
