/**
 * Created by Vickey on 2017/6/18.
 */
import React, {Component} from 'react';
import {Modal, View, Text} from 'react-native';
import {SjkhStyles} from '../style/sjkh'


class MModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.visible || false
    }
  }
  
  renderHeader() {
    const {header} = this.props;
    if (header !== false) {
      return (
        <View style={[SjkhStyles.modal_header]}>
          <Text style={{flex: 1, alignItems: 'center', padding: 10}}>{header}</Text>
        </View>
      )
    }
  }
  
  renderBody() {
    return (
      <View style={[SjkhStyles.modal_body]}>
        {this.props.children}
      </View>
    )
  }
  
  renderFooter() {
    const {footer} = this.props;
    if (footer !== false) {
      return (
        <View style={[SjkhStyles.modal_footer]}>
          <Text>Footer</Text>
        </View>
      )
    }
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