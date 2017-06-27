/**
 * Created by kim on 2017/6/26.
 */

import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {CommonStyles, StyleConfig} from "../style";
import {Swipeout} from "./index";

class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || false,
      opendId: ''
    }
  }

  renderSelected() {
    if (this.state.selected) {
      return (
        <Icon
          style={styles.selected_icon}
          name={ 'ios-checkmark' }
          size={ 40 }
          color={ StyleConfig.color_primary }/>
      )
    }
  }

  onPress() {
    const {onPress, select, data} = this.props;
    if (select) {
      this.setState({selected: !this.state.selected});
    }
    onPress && onPress.call(this, data);
  }

  render() {
    let {style, rightBtn, onOpen, close, scroll} = this.props;
    if (rightBtn) {
      return (
        <Swipeout
          close={close}
          right={rightBtn}
          autoClose={true}
          onOpen={onOpen}
          scroll={scroll}
          buttonWidth={60}
          sensitivity={1}>
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <View style={[styles.list_item, CommonStyles.border_b, style]}>
              { this.props.children }
              {this.renderSelected()}
            </View>
          </TouchableOpacity>
        </Swipeout>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <View style={[styles.list_item, CommonStyles.border_b, style]}>
            { this.props.children }
            {this.renderSelected()}
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  list_item: {
    flexDirection: 'row',
    backgroundColor: StyleConfig.color_white,
    padding: 10
  },
  selected_icon: {
    position: 'absolute',
    right: 15
  }
});

export  default ListRow;