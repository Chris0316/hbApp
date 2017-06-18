/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {View, Text} from "react-native";
import Btn from "../../component/button";
import BaseView from "../BaseView";
import MModal from '../../component/modal'

class OpenAccount extends BaseView {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  
  renderModal() {
    if (this.state.showModal) {
      return (
        <MModal
          header={'标题'}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({showModal: false})
          }}>
          <Text>哈哈哈</Text>
        </MModal>
      )
    }
  }
  
  onPress() {
    const {router} = this.props;
    //router.push('phoneNumberVerify')
    this.setState({
      showModal: true
    })
  }
  
  renderBody() {
    
    return (
      <View>
        {this.renderModal()}
        <Btn onPress={this.onPress.bind(this)}>我知道了</Btn>
      </View>
    )
  }
}

export default OpenAccount;