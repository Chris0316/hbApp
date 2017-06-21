import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Icon from "react-native-vector-icons/Ionicons";
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
      titleText = title.substring(0, 15) + "...";
    }
    let pgStyle = {
      color: this.props.color || StyleConfig.color_black
    };
    return (
      <View
        style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.background_transparent, CommonStyles.flex_1] }>
        <Text
          style={ [this.props.back ? styles.back : '',
            CommonStyles.text_dark, CommonStyles.text_center, CommonStyles.font_sm, CommonStyles.flex_1, pgStyle] }>
          { titleText }
        </Text>
      </View>
    )
  }
  
  renderLeftContent() {
    const {back, close, leftIconOnPress, closeIconOnPress, color} = this.props;
    let iconColor = color || StyleConfig.color_primary;
    let renderBackIcon = () => {
      if (back) {
        return (
          <Icon
            onPress={ () => leftIconOnPress() }
            name={ 'ios-arrow-back' }
            style={{color: iconColor}}
            size={ 30 }
          />
        )
      }
    };
    
    let renderCloseIcon = () => {
      if (close) {
        return (
          <Icon
            onPress={ () => closeIconOnPress() }
            name={ 'md-close' }
            style={{color: iconColor, paddingLeft: 15}}
            size={ 24 }
          />
        )
      }
    };
    return (
      <View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }>
        {renderBackIcon()}
        {renderCloseIcon()}
      </View>
    )
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
    let pgStyle = {
      backgroundColor: this.props.backgroundColor || StyleConfig.color_white
    };
    return (
      <View
        style={ [CommonStyles.border_b, CommonStyles.flexRow, CommonStyles.pos_absolute, styles.container, pgStyle] }>
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
