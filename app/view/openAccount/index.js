/**
 * Created by kim on 2017/6/8.
 */

import React from "react";
import {StyleSheet, Text, View} from "react-native";
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
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 14, height: 32, padding: 5, backgroundColor: '#C50436', color: '#fff', flex: 1, textAlign: 'center'}}>1 实名认证</Text>
            <Text style={styles.triangle}></Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: -13}}>
            <View>
              <Text style={styles.triangle2_1}></Text>
              <Text style={styles.triangle2_2}></Text>
            </View>
            <Text style={{fontSize: 14, height: 32, padding: 5, backgroundColor: '#C50436', color: '#fff', flex: 1, textAlign: 'center'}}>2 开户账户</Text>
            <Text style={styles.triangle}></Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: -13}}>
            <View>
              <Text style={styles.triangle2_1}></Text>
              <Text style={styles.triangle2_2}></Text>
            </View>
            <Text style={{fontSize: 14, height: 32, padding: 5, backgroundColor: '#C50436', color: '#fff', flex: 1, textAlign: 'center'}}>3 开户确认</Text>
          </View>
        </View>
        <Btn onPress={() => {
          router.push('phoneNumberVerify')
        }}>我知道了</Btn>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#C50436',
  },

  triangle2_1: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: '#C50436',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  },
  triangle2_2: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#C50436',
    borderLeftColor: 'transparent'
  }
});

export default OpenAccount;