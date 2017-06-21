/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {View} from "react-native";
import TimerMixin from "react-timer-mixin";
import {Button} from "../../component";
import BaseView from "../BaseView";

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

  renderBody() {
    return (
      <View>
        <Button loading={this.state.loading} onPress={this.onPress.bind(this)}>我知道了</Button>
      </View>
    )
  }
}

export default OpenAccount;