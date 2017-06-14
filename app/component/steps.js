/**
 * Created by kim on 2017/6/13.
 */

import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
class Steps extends Component {
  constructor(props) {
    super(props);
    this.steps = this.props.steps || [
        '实名认证', '开户账户', '开户确认'
      ];
    this.current = this.props.current || 0;
  }

  getCurrentStyle(type, index) {
    let array = [];
    array.push(styles[type]);
    if (this.current >= index) {
      array.push(styles[type + "_current"]);
    }
    return array;
  }

  render() {
    let steps = this.steps;
    return (
      <View style={styles.step_container}>
        <View style={[styles.step_item]}>
          <Text style={this.getCurrentStyle('step_title', 1)}>1 {steps[0]}</Text>
          <Text style={this.getCurrentStyle('triangle', 1)}/>
        </View>
        <View style={[styles.step_item, styles.step_item_gap]}>
          <View>
            <Text style={this.getCurrentStyle('triangle_up', 2)}/>
            <Text style={this.getCurrentStyle('triangle_down', 2)}/>
          </View>
          <Text style={this.getCurrentStyle('step_title', 2)}>2 {steps[1]}</Text>
          <Text style={this.getCurrentStyle('triangle', 2)}/>
        </View>
        <View style={[styles.step_item, styles.step_item_gap]}>
          <View>
            <Text style={this.getCurrentStyle('triangle_up', 3)}/>
            <Text style={this.getCurrentStyle('triangle_down', 3)}/>
          </View>
          <Text style={this.getCurrentStyle('step_title', 3)}>3 {steps[2]}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  step_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  step_item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  step_item_gap: {
    marginLeft: -13
  },
  step_title: {
    fontSize: 14,
    height: 32,
    padding: 5,
    backgroundColor: '#f7f7f7',
    color: '#4a4a4a',
    flex: 1,
    textAlign: 'center'
  },
  step_title_current: {
    backgroundColor: '#C50436',
    color: '#fff'
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#f7f7f7',
  },
  triangle_current: {
    borderLeftColor: '#C50436'
  },

  triangle_up: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: '#f7f7f7',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  },
  triangle_up_current: {
    borderTopColor: '#C50436'
  },
  triangle_down: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f7f7f7',
    borderLeftColor: 'transparent'
  },
  triangle_down_current: {
    borderBottomColor: '#C50436'
  }
});

export default Steps