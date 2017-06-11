/**
 * Created by kim on 2017/6/9.
 */

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {ComponentStyles} from "../style";
import Navbar from "../component/navbar";
import DropDown from "../component/dropdown";
class BaseView extends Component {
  
  constructor(props) {
    super(props);
    const {navigator} = this.props;
    this.back = navigator.getCurrentRoutes().length > 1;
    this.state = {
      showHelp: false
    }
  }
  
  renderNavbar() {
    const {title, router} = this.props;
    return (
      <Navbar
        back={this.back} title={ title }
        leftIconOnPress={ () => router.pop() }
        rightIconOnPress={() => this.setState({showHelp: true})}/>
    )
  }
  
  renderHelp() {
    return (
      <DropDown showHelp={this.state.showHelp} onPress={() => this.setState({showHelp: false})}/>
    )
  }
  
  render() {
    return (
      <View style={[ComponentStyles.container]}>
        <View style={styles.container}>
          {this.renderNavbar()}
          {this.renderBody()}
        </View>
        {this.renderHelp()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0
  }
});

export default BaseView