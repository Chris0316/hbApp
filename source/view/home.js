/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Text, View} from "react-native";
import {ComponentStyles} from "../style";
import {login} from '../service/userService'
class Home extends Component {
  
  constructor(props) {
    super(props);
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
  
  render() {
    return (
      <View style={ComponentStyles.container}>
        <Text onPress={() => {
          this.openWeb()
        }}>Home...</Text>
        <Text style={{fontSize: 50, color: 'red'}} onPress={this.login.bind(this)}>TEST</Text>
      </View>
    )
  }
}
export  default Home;