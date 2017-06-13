/**
 * Created by kim on 2017/5/24.
 */

import React, {Component} from "react";
import {Button, Image, Keyboard, ListView, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CommonStyles, ComponentStyles, HtmlConvertorStyles} from "../style";
import HomeRender from "../component/header/home";
import {connect} from "react-redux";
import Toast from "@remobile/react-native-toast";
import {bindActionCreators} from "redux";
import * as userAction from "../redux/action/user";
import * as todoAction from "../redux/action/todo";
import AV from "leancloud-storage";
let c_photo = '';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    let {todoAction} = this.props;
    todoAction.fetch();
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  gotoLogin() {
    this.props.navigation.navigate('login', {
      title: '登录'
    })
  }

  doLogout() {
    const {userAction} = this.props;
    userAction.logout();
  }

  renderLogin() {
    let {user} = this.props;
    if (user && !user.login) {
      return (
        <Button onPress={this.gotoLogin.bind(this)} title='登录1'/>
      )
    }
  }

  renderLogout() {
    let {user} = this.props;
    if (user && user.login === true) {
      return (
        <Button onPress={this.doLogout.bind(this)} title='退出'/>
      )
    }
  }

  doUpload() {
    if (!c_photo) {
      return
    }
    var data = {
      'blob': {
        uri: c_photo
      }
    };
    var file = new AV.File('test.jpg', data);
    file.save().then(function (f) {
      console.log(f);
    }, function (error) {
      console.error(error);
    });
  }

  renderBtn() {
    return (
      <View style={ComponentStyles.container}>
        <Text
          style={[ComponentStyles.btn_primary_outline, CommonStyles.m_t_1, CommonStyles.p_a_2, CommonStyles.text_center]}
          onPress={this.doUpload.bind(this)}
        >上传</Text>
      </View>
    );
  }

  renderImg() {
    let {navigation} = this.props;
    let params = navigation.state.params;
    if (!params) {
      return
    }
    let photo = params.photo;
    if (!photo) {
      return
    }
    c_photo = photo.mediaUri;
    return (
      <Image source={{uri: c_photo}} style={HtmlConvertorStyles.img}></Image>
    )
  }

  renderRow(item) {
    return (
      <TouchableOpacity>
        <View style={ComponentStyles.container}>
          <Text>{item.get('text')}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  renderList() {
    let {todo} = this.props;
    let todoList = todo.todos;
    if (todoList && todoList.length > 0) {
      let ds = this.state.dataSource.cloneWithRows(todoList);
      return (
        <ListView style={ComponentStyles.list}
                  dataSource={ds}
                  renderRow={this.renderRow}
        />
      )
    }
  }

  addItem() {
    const {todoAction} = this.props;
    if (!this.state.todo) {
      Toast.show('请输入内容');
      return
    }
    todoAction.add(this.state.todo);
    this.setState({
      todo: ''
    });
    this.refs.todo.clear();
    Keyboard.dismiss();
  }

  renderForm() {
    return (
      <View style={CommonStyles.flexRow}>
        <TextInput
          ref="todo"
          style={[ComponentStyles.input_control, CommonStyles.flex_3]}
          placeholder="输入内容"
          clearButtonMode="always"
          underlineColorAndroid="transparent"
          onChangeText={(text) => this.setState({'todo': text})}
        />
        <TouchableOpacity>
          <Text onPress={this.addItem.bind(this)} style={[ComponentStyles.btn, ComponentStyles.btn_primary]}>添加</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let {todo} = this.props;
    return (
      <View style={ ComponentStyles.container }>
        <StatusBar
          translucent={ true }
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"/>
        <HomeRender navigate={ this.props.navigation.navigate }>
          {this.renderLogin()}
          {this.renderLogout()}
          {/*{this.renderBtn()}*/}
          {/*{this.renderImg()}*/}
          {this.renderForm()}
          {this.renderList()}
        </HomeRender>
      </View>
    )
  }
}

export default connect(state => ({
  user: state.user,
  todo: state.todo
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
  todoAction: bindActionCreators(todoAction, dispatch)
}))(Home)