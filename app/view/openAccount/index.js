/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {View} from "react-native";
import Btn from "../../component/button";
import BaseView from "../BaseView";

class OpenAccount extends BaseView {
  constructor(props) {
    super(props);
  }

  renderBody() {
    const {router} = this.props;
    return (
      <View>
        <Btn onPress={() => {
          router.push('thirdDepository')
        }}>我知道了</Btn>
      </View>
    )
  }
}

export default OpenAccount;