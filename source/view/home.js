/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Image, ScrollView, StatusBar, Text, View} from "react-native";
import {CommonStyles, ComponentStyles, HtmlConvertorStyles} from "../style";
import {login} from "../service/userService";
import config from "../config";
import {decodeHTML} from "../common";
import HtmlConvertor from "../component/htmlConvertor";
import HomeRender from "../component/header/home";
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: ''
    }
  }

  openWeb() {
    let url = 'http://www.163.com'
    this.props.navigation.navigate('web', {
      url: url
    })
  }

  login() {
    login('18016052872', '111111').then(res => {
      if (res.isSuc) {
        this.props.navigation.setParams({'title': '123'})
      }
    })
  }

  showHtml() {
    let html = decodeHTML(config.news);
    if (this.state.html) {
      this.setState({
        html: ''
      })
    } else {
      this.setState({
        html: html
      })
    }
  }

  renderHTML() {
    if (this.state.html) {
      return (
        <ScrollView>
          <View style={ [CommonStyles.p_a_3] }>
            <HtmlConvertor
              navigate={ this.props.navigation.navigate }
              content={ this.state.html }>
            </HtmlConvertor>
          </View>
        </ScrollView>
      )
    }

  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        <StatusBar
          translucent={ true }
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"/>
        <HomeRender navigate={ this.props.navigation.navigate }>
          <Text onPress={() => {
            this.openWeb()
          }}>Home...</Text>
          <Image source={require('../image/test.jpg')} style={HtmlConvertorStyles.img}/>
          <Text style={{fontSize: 50, color: 'red'}} onPress={this.showHtml.bind(this)}>更新的内容多一些试试看!</Text>
          {this.renderHTML()}
        </HomeRender>
      </View>
    )
    // return (
    //   <View style={ComponentStyles.container}>
    //     <Text onPress={() => {
    //       this.openWeb()
    //     }}>Home...</Text>
    //     <Text style={{fontSize: 50, color: 'red'}} onPress={this.showHtml.bind(this)}>TEST</Text>
    //     {this.renderHTML()}
    //   </View>
    // )
  }
}
export  default Home;