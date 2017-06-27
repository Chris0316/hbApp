/**
 * Created by Vickey on 2017/6/23.
 */

import React from "react";
import {
  InteractionManager,
  Keyboard,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Toast from "@remobile/react-native-toast";
import * as todoAction from "../../redux/action/todo";
import {ComponentStyles, StyleConfig} from "../../style";
import ListViewPage from "../common/ListView";
import {InputItem, ListItem, Loading} from "../../component";

class Todos extends ListViewPage {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      openId: '',
      edit: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }
  
  componentDidMount() {
    super.componentDidMount();
    const {todoAction} = this.props;
    InteractionManager.runAfterInteractions(() => {
      todoAction.fetch();
    });
  }
  
  doUpdate(row) {
    const {todoAction} = this.props;
    if (this.state.editText) {
      todoAction.edit(row.id, this.state.editText, () => {
        this.setState({
          edit: false
        });
      });
    }
  }
  
  renderRow(row) {
    const {todoAction, todo} = this.props;
    let todos = todo.todos;
    let rightBtn = [{
      text: '修改',
      type: 'primary',
      onPress: () => {
        this.setState({
          edit: true
        });
      }
    }, {
      text: '删除',
      type: 'delete',
      onPress: () => {
        let idx = -1;
        todos.find((item, i) => {
          if (item.id === row.id) {
            idx = i;
            return item;
          }
        });
        todoAction.remove(row.id);
      }
    }];
    
    let renderText = () => {
      if (!this.state.edit) {
        return (
          <Text style={{flex: 1}}>{row.get('text')}</Text>
        )
      } else {
        if (this.state.opendId !== row.id) {
          return (
            <Text style={{flex: 1}}>{row.get('text')}</Text>
          )
        } else {
          return (
            <TextInput
              style={styles.edit_text}
              autoFocus={true}
              underlineColorAndroid="transparent"
              defaultValue={row.get('text')}
              onBlur={this.doUpdate.bind(this, row)}
              onChangeText={(text) => {
                this.setState({editText: text})
              }}/>
          )
        }
      }
    };
    return (
      <ListItem
        close={this.state.opendId !== row.id}
        data={row}
        rightBtn={rightBtn}
        onOpen={() => {
          this.setState({
            opendId: row.id
          })
        }}>
        {renderText()}
        <Text style={{width: 200}}>{row.id}</Text>
      </ListItem>
    )
  }
  
  renderFooter() {
    const {todo} = this.props;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={StyleConfig.color_primary}/>
        <Text style={styles.footer_text}>
          数据加载中……
        </Text>
      </View>
    );
  }
  
  renderList() {
    const {todo} = this.props;
    let todos = todo.todos || [], isEmpty = todo.isEmpty || false;
    if (isEmpty) {
      return (
        <View style={ComponentStyles.container}>
          <Text style={{flex: 1, textAlign: 'center', paddingTop: 60}}>数据为空</Text>
        </View>
      )
    } else {
      return (
        <ListView
          initialListSize={14}
          dataSource={this.state.dataSource.cloneWithRows(todos)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          renderFooter={this.renderFooter.bind(this)}
          refreshControl={
            <RefreshControl
              style={{backgroundColor: 'transparent'}}
              refreshing={this.props.todo.loading}
              onRefresh={() => this.props.todoAction.fetch()}
              title="加载中..."
              colors={[StyleConfig.color_primary]}
            />
          }
        />
      )
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
        {/*{this.renderLoading()}*/}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  edit_text: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    padding: 0,
    height: 19
  },
  
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  
  footer_text: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10
  },
});
export default connect(state => ({
  todo: state.todo
}), dispatch => ({
  todoAction: bindActionCreators(todoAction, dispatch)
}), null, {
  withRef: true
})(Todos)