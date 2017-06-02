/**
 * Created by kim on 2017/6/2.
 */

import {StackNavigator} from "react-navigation";

import * as View from "./index";

const AppNavigator = StackNavigator({
  start: {
    screen: View.start,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  home: {
    screen: View.home,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title || '主页',
      header: null
    })
  },
  web: {
    screen: View.web,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'white'},
      title: navigation.state.params.title
    })
  }
}, {
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: '#333333',
    showIcon: true
  },
  mode: 'card'
});

export default AppNavigator