/**
 * Created by Vickey on 2017/6/23.
 */

import React from "react";
import {InteractionManager, ListView, Text, View,Keyboard} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Toast from "@remobile/react-native-toast";
import * as todoAction from "../../redux/action/todo";
import {ComponentStyles} from "../../style";
import ListViewPage from "../common/ListView";
import {InputItem, ListItem, Loading} from "../../component";

class Todos extends ListViewPage {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentDidMount() {
    const {todoAction} = this.props;
    InteractionManager.runAfterInteractions(() => {
      todoAction.fetch();
    })
  }

  onDelete(id) {
    const {todoAction} = this.props;
    let todos = this.props.todo.todos;
    let idx = -1;
    todos.find((item, i) => {
      if (item.id === id) {
        idx = i;
        return item;
      }
    });
    todoAction.remove(id);
  }

  renderRow(row) {
    return (
      <ListItem data={row} onPress={this.onDelete.bind(this, row.id)}>
        <Text style={{flex: 1}}>{row.get('text')}</Text>
        <Text style={{width: 200}}>{row.id}</Text>
      </ListItem>
    )
  }

  renderList() {
    let todos = this.props.todo.todos || [];
    if (todos.length > 0) {
      return (
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(todos)}
          renderRow={this.renderRow.bind(this)}
        />
      )
    } else {
      return null;
    }
  }

  validator() {
    let text = this.state.text;
    if (!text) {
      Toast.show('请输入内容');
      return false;
    }
    return true;
  }

  doSubmit() {
    let flag = this.validator();
    if (flag !== true) {
      return;
    }
    const {todoAction} = this.props;
    todoAction.add(this.state.text);
    this.setState({
      text: ''
    });
    Keyboard.dismiss();
  }

  renderLoading() {
    let {todo} = this.props;
    if (todo.loading === true) {
      return <Loading/>
    }
  }

  renderForm() {
    let {todo} = this.props;
    return (
      <InputItem
        type="submit"
        btnLabel="添加"
        label="内容"
        placeholder="请输入内容"
        value={this.state.text}
        loading={todo.saving}
        onSubmit={this.doSubmit.bind(this)}
        onChange={(t) => this.setState({text: t})}/>
    )
  }

  renderBody() {
    return (
      <View style={ComponentStyles.container}>
        {this.renderForm()}
        {this.renderList()}
        {this.renderLoading()}
      </View>
    )
  }
}

export default connect(state => ({
  todo: state.todo
}), dispatch => ({
  todoAction: bindActionCreators(todoAction, dispatch)
}), null, {
  withRef: true
})(Todos)