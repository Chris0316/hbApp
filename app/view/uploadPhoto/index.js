/**
 * Created by kim on 2017/6/12.
 */

import React from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import BaseView from "../BaseView";
import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";
import {SjkhStyles} from "../../style/sjkh";
import {Button, Steps} from "../../component";
import RNFetchBlob from "react-native-fetch-blob";
const card1 = require('../../image/sjkh/card.png');
const card2 = require('../../image/sjkh/card-face.png');

class UploadPhoto extends BaseView {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imageType: 1,
      image1: card1,
      image2: card2
    }
  }

  showUploadModal(type) {
    this.imageType = type;
    this.ActionSheet.show()
  }

  checkOCR(base64) {
    RNFetchBlob.fetch('POST', 'http://imgs3.intsig.net/icr/recog_idcard_demo?head_portrait=1&crop_image=1', {
      'Content-Type': 'application/octet-stream',
    }, base64).then((res) => {
      console.log(res)
    }, err => {
      console.log(err)
    }).catch((err) => {
      console.log(err)
    })
  }

  doUpload(i) {
    if (i === 1) {
      ImagePicker.openPicker({
        width: 400,
        height: 300,
        cropping: true,
        includeBase64: true
      }).then(image => {
        let imageSource = {uri: `data:${image.mime};base64,` + image.data};
        let key = this.imageType === 1 ? 'image1' : 'image2';
        this.setState({
          [key]: imageSource
        });
        this.checkOCR(image.data);
      });
    } else if (i === 2) {
      ImagePicker.openCamera({
        width: 400,
        height: 300,
        cropping: true,
        includeBase64: true
      }).then(image => {
        let imageSource = {uri: `data:${image.mime};base64,` + image.data};
        let key = this.imageType === 1 ? 'image1' : 'image2';
        this.setState({
          [key]: imageSource
        });
        this.checkOCR(image.data);
      });
    }
  }

  doNext() {
    const {router} = this.props;
    router.push('personInfo')
  }

  renderUploadModal() {
    return (
      <ActionSheet
        ref={o => this.ActionSheet = o}
        options={['取消', '从相册选择', '拍照上传']}
        cancelButtonIndex={0}
        onPress={this.doUpload.bind(this)}
      />)
  }


  renderModal() {
    let showModal = this.state.showModal;
    if (showModal) {
      return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({showModal: false})
          }}
        >
          <View style={[SjkhStyles.modal_container]}>
            <View style={[SjkhStyles.modal_body]}>
              <Text style={[CommonStyles.font_bold, CommonStyles.color_dark, CommonStyles.font_md, CommonStyles.p_a_2]}>身份证照片要求</Text>
              <View style={[CommonStyles.flexItemsLeft]}>
                <Text style={[CommonStyles.font_xs, CommonStyles.color_dark]}>1.需要您本人的有效二代身份证；</Text>
                <Text style={[CommonStyles.font_xs, CommonStyles.color_dark]}>2.请确保身份证边框完整，字迹清晰，亮度均匀；</Text>
              </View>
              <Image source={require('../../image/sjkh/card.png')}
                     style={{width: 120, height: 90, marginTop: 10, marginBottom: 10}}/>
              <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                <Text>标准</Text>
                <Image source={require('../../image/sjkh/true.png')} style={{width: 20, height: 20, marginLeft: 5}}/>
              </View>
              <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                <View>
                  <Image source={require('../../image/sjkh/card-lost.png')}
                         style={{width: 90, height: 58, marginRight: 8, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>边框丢失</Text>
                    <Image source={require('../../image/sjkh/false.png')}
                           style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
                <View>
                  <Image source={require('../../image/sjkh/card-mh.png')}
                         style={{width: 90, height: 58, marginRight: 8, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>照片模糊</Text>
                    <Image source={require('../../image/sjkh/false.png')}
                           style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
                <View>
                  <Image source={require('../../image/sjkh/card-fg.png')}
                         style={{width: 90, height: 58, marginTop: 10, marginBottom: 10}}/>
                  <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
                    <Text>闪光强烈</Text>
                    <Image source={require('../../image/sjkh/false.png')}
                           style={{width: 20, height: 20, marginLeft: 5}}/>
                  </View>
                </View>
              </View>
              <Button style={SjkhStyles.modal_btn} onPress={() => {
                this.setState({showModal: false})
              }}>我知道了</Button>
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
          <Steps current={1}/>
          <View style={[CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle]}>
            <Text style={[SjkhStyles.tips_block, CommonStyles.flex_1]}>
              请上传你的有效二代身份证照片
            </Text>
            <Text onPress={() => {
              this.setState({showModal: true})
            }} style={[SjkhStyles.tips_block, CommonStyles.text_warning]}>查看示例</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.showUploadModal.bind(this, 1)}>
            <View style={styles.idCard}>
              <Image source={this.state.image1} style={{width: 260, height: 182}}/>
              <Text>正面</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.showUploadModal.bind(this, 2)}>
            <View style={styles.idCard}>
              <Image source={this.state.image2} style={{width: 260, height: 182}}/>
              <Text>反面</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.renderModal()}
        {this.renderUploadModal()}
        <Button type="block" onPress={this.doNext.bind(this)}>下一步</Button>
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
  idCard: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});

export  default UploadPhoto;