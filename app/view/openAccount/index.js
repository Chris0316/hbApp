/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button} from "../../component";
import FormView from "../common/FormView";
import * as userAction from "../../redux/action/user";

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

  renderBody() {
    return (
      <View>
        <Button loading={this.props.user.loading} onPress={this.onSubmit.bind(this)}>我知道了</Button>
      </View>
    )
  }
}

export default connect(state => ({
  user: state.user
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch)
}), null, {
  withRef: true
})(OpenAccount)