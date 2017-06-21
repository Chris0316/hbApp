/**
 * Created by kim on 2017/6/13.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {StyleConfig} from "../style";
class Link extends Component {
  constructor(props) {
    super(props)
  }

  onPress() {
    const {href, router, title = ' '} = this.props;
    if (href) {
      if (href.indexOf('http') === 0) {
        router.push('web', {
          url: href,
          title
        })
      } else {
        router.push(href);
      }
    }
  }

  render() {
    const {href} = this.props;
    if (href) {
      return (
        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <Text style={[styles.link]}>{ this.props.children }</Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4B83F4',
    fontSize: StyleConfig.font_ms
  }
});

export default Link