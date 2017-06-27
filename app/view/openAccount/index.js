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
    const {router} = this.props;
    router.push('todos')
  }
  
  renderBody() {
    return (
      <View>
        <Button onPress={this.onSubmit.bind(this)}>我知道了</Button>
      </View>
    )
  }
}

export default connect(state => ({
  page: state.user
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
}), null, {
  withRef: true
})(OpenAccount)