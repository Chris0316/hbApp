/**
 * Created by Vickey on 2017/6/18.
 */
import React, {Component} from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {SjkhStyles} from "../style/sjkh";


class MModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.visible || false
    }
  }

  renderHeader() {
    const {header, close, onRequestClose} = this.props;
    const renderClose = () => {
      if (close !== false) {
        return (
          <Icon
            onPress={onRequestClose}
            name={ 'md-close' }
            style={[SjkhStyles.modal_header_close]}
            size={ 20 }
          />
        )
      }
    };
    if (!header) {
      return
    }
    return (
      <View style={[SjkhStyles.modal_header]}>
        <Text style={SjkhStyles.modal_header_text}>{header}</Text>
        {renderClose()}
      </View>
    )
  }

  renderBody() {
    const {header, footer, onConfirm, onCancel} = this.props;
    const noFooter = footer === false || (!onConfirm && !onCancel);
    return (
      <View style={[SjkhStyles.modal_body,
        !header ? SjkhStyles.modal_body_no_header : '',
        noFooter === true ? SjkhStyles.modal_body_no_footer : ''
      ]}>
        {this.props.children}
      </View>
    )
  }

  renderFooter() {
    const {footer, onConfirm, onCancel} = this.props;
    const renderConfirmBtn = () => {
      if (onConfirm) {
        return (
          <View style={[SjkhStyles.modal_footer_btn, SjkhStyles.modal_footer_btn_confirm]}>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={[SjkhStyles.modal_footer_btn_text, SjkhStyles.modal_footer_btn_text_confirm]}>确定</Text>
            </TouchableOpacity>
          </View>
        )
      }
    };
    const renderCancelBtn = () => {
      if (onCancel) {
        return (
          <View style={[SjkhStyles.modal_footer_btn]}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={[SjkhStyles.modal_footer_btn_text]}>取消</Text>
            </TouchableOpacity>
          </View>
        )
      }
    };
    if (footer === false) {
      return
    }
    return (
      <View style={[SjkhStyles.modal_footer]}>
        {renderCancelBtn()}
        {renderConfirmBtn()}
      </View>
    )
  }

  render() {
    const {onRequestClose} = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={onRequestClose}
      >
        <View style={[SjkhStyles.modal_container]}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </View>
      </Modal>
    )
  }

}

export default MModal;