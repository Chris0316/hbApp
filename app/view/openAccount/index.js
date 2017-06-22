/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {View} from "react-native";
import TimerMixin from "react-timer-mixin";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button} from "../../component";
import BaseView from "../BaseView";
import * as userAction from "../../redux/action/user";

class OpenAccount extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false
    }
  }

  onPress() {
    const {router} = this.props;
    this.setState({
      loading: true
    });
    TimerMixin.setTimeout(() => {
      this.setState({
        loading: false
      });
      router.push('phoneNumberVerify');
    }, 300);
  }

  onPress2() {
    const {userAction, router} = this.props;
    userAction.login('18016052872', '111111');
    router.push('phoneNumberVerify');
  }

  renderBody() {
    // console.log('user--------------',this.props.user)
    return (
      <View>
        <Button loading={this.props.user.loading} onPress={this.onPress2.bind(this)}>我知道了</Button>
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