import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
      <Text style={ [CommonStyles.text_dark, CommonStyles.text_center, CommonStyles.font_sm, styles.title, pgStyle] }>
        { titleText }
      </Text>
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
            style={{color: iconColor, paddingLeft: 10, paddingRight: 10}}
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
            style={{color: iconColor, paddingRight: 10, paddingLeft: 10}}
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
    const {color} = this.props;
    let iconColor = color || StyleConfig.color_primary;
    return (
      <Icon
        name={ 'ios-help-circle-outline' }
        style={{color: iconColor, paddingRight: 10}}
        size={ 24 }
      />
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
      <View style={ [CommonStyles.border_b, styles.container, pgStyle] }>
        { this.renderTitle() }
        { this.renderLeftContent() }
        <Text style={{flex: 1}}></Text>
        { this.renderRightContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: StyleConfig.navbar_height,
    width: StyleConfig.screen_width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    position: 'absolute',
    height: StyleConfig.navbar_height,
    width: StyleConfig.screen_width,
    top: 0,
    left: 0,
    textAlign: 'center',
    paddingVertical: 8
  }
});

export default Navbar;
