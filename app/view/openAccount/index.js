/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button} from "../../component";
import FormView from "../common/FormView";
import * as userAction from "../../redux/action/user";
import * as todoAction from "../../redux/action/todo";

class OpenAccount extends FormView {
  constructor(props) {
    super(props);
  }

  doSubmit() {
    const {router, userAction} = this.props;
    userAction.login('18016052872', '111111', (res) => {
      if (res.isSuc) {
        router.push('phoneNumberVerify');
      } else {
        alert('密码错误');
      }
    });
  }

  renderRow(row) {
    return (
      <Text>{row}</Text>
    )
  }

  renderBody() {
    const {page} = this.props;
    return (
      <View>
        <Button loading={page.loading} onPress={this.onSubmit.bind(this)}>我知道了</Button>
      </View>
    )
  }
}

export default connect(state => ({
  page: state.user
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
  todoAction: bindActionCreators(todoAction, dispatch)
}), null, {
  withRef: true
})(OpenAccount)