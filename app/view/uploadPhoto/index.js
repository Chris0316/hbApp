/**
 * Created by kim on 2017/6/12.
 */

import React from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import BaseView from "../BaseView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import Btn from "../../component/button";
class UploadPhoto extends BaseView {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  doNext() {
    alert('next')
  }


  renderModal() {
    let showModal = this.state.showModal;
    if (showModal) {
      return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({showModal: false})
          }}
        >
          <View style={[styles.modal_container]}>
            <View style={[styles.modal_body]}>
              <Text style={[CommonStyles.font_bold, CommonStyles.color_dark, CommonStyles.font_md, CommonStyles.p_a_2]}>身份证照片要求</Text>
              <View style={[CommonStyles.flexItemsLeft]}>
                <Text style={[CommonStyles.font_xs, CommonStyles.color_dark]}>1.需要您本人的有效二代身份证；</Text>
                <Text style={[CommonStyles.font_xs, CommonStyles.color_dark]}>2.请确保身份证边框完整，字迹清晰，亮度均匀；</Text>
              </View>
              <Image source={require('../../image/sjkh/card.png')} style={{width: 120, height: 90, marginTop: 10, marginBottom: 10}}/>
              <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                <Text>标准</Text>
                <Image source={require('../../image/sjkh/true.png')} style={{width: 20, height: 20, marginLeft: 5}}/>
              </View>
              <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                <View>
                  <Image source={require('../../image/sjkh/card-lost.png')} style={{width: 90, height: 58, marginRight: 8, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>边框丢失</Text>
                    <Image source={require('../../image/sjkh/false.png')} style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
                <View>
                  <Image source={require('../../image/sjkh/card-mh.png')} style={{width: 90, height: 58, marginRight: 8, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>照片模糊</Text>
                    <Image source={require('../../image/sjkh/false.png')} style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
                <View>
                  <Image source={require('../../image/sjkh/card-fg.png')} style={{width: 90, height: 58, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>闪光强烈</Text>
                    <Image source={require('../../image/sjkh/false.png')} style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
              </View>
              <Btn onPress={() => {
                this.setState({showModal: false})
              }}>我知道了</Btn>
            </View>
          </View>
        </Modal>
      )
    }
  }

  renderBody() {
    return (
      <View style={ComponentStyles.container}>
        <ScrollView style={[styles.content]}>
          <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
            <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1]}>
              请上传你的有效二代身份证照片
            </Text>
            <Text onPress={() => {
              this.setState({showModal: true})
            }} style={[SjkhStyles.tips_block, CommonStyles.text_warning]}>查看示例</Text>
          </View>
          <View style={[ComponentStyles.flexItemsMiddle, CommonStyles.flexItemsCenter]}>
            <View style={CommonStyles.flex_1}>
              <Image source={require('../../image/sjkh/card.png')} style={{width: 260, height: 182, marginTop: 20, marginBottom: 20}}/>
            </View>
            <View>
              <Image source={require('../../image/sjkh/card-face.png')} style={{width: 260, height: 182}}/>
            </View>
          </View>
        </ScrollView>
        {this.renderModal()}
        <Btn type="block" onPress={this.doNext.bind(this)}>下一步</Btn>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: StyleConfig.screen_height - StyleConfig.navbar_height - 63,
    backgroundColor: StyleConfig.color_white
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -50
  },
  modal_body: {
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15
  },
});

export  default UploadPhoto;