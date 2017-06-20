/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {Image, View} from "react-native";
import {Button} from "../../component";
import BaseView from "../BaseView";

class OpenAccount extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  onPress() {
    const {router} = this.props;
    router.push('phoneNumberVerify');
  }

  renderBody() {
    return (
      <View>
        <Button onPress={this.onPress.bind(this)}>我知道了</Button>
      </View>
    )
  }
}

export default OpenAccount;