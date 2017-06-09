/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import Btn from "../../component/button";
import BaseView from "../BaseView";
import {ScrollView, Text, View} from "react-native";
import {CommonStyles, ComponentStyles} from "../../style";

class PersonInfo extends BaseView {
  constructor(props) {
    super(props);
  }

  renderBody() {
    const {router} = this.props;
    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[CommonStyles.flex_1]}>
          <Text style={CommonStyles.flex_1}>xxx</Text>
        </ScrollView>
        <Btn type="block">下一步</Btn>
      </View>

    )
  }
}

export default PersonInfo;