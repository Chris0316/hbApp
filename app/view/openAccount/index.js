/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import Btn from "../../component/button";
import BaseView from "../BaseView";

class OpenAccount extends BaseView {
  constructor(props) {
    super(props);
  }

  renderBody() {
    const {router} = this.props;
    return (
      <Btn onPress={() => {
        router.push('phoneNumberVerify')
      }}>我知道了</Btn>
    )
  }
}

export default OpenAccount;