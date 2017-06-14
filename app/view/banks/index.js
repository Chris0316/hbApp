/**
 * Created by kim on 2017/6/14.
 */

import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import BaseView from "../BaseView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import InputItem from "../../component/inputItem";
import Steps from "../../component/steps";
import CheckBox from "../../component/checkbox";
import Btn from "../../component/button";
import Link from "../../component/link";
class Banks extends BaseView {
  constructor(props) {
    super(props);
  }

  renderBody(){
    return(
      <View>
        <Text>Banks</Text>
      </View>
    )
  }
}
export default Banks;