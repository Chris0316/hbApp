/**
 * Created by Vickey on 2017/6/16.
 */
import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {StyleConfig} from "../../style";
import * as BankIcons from "../../component/banks";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || false
    }
  }
  
  toggleItemSelected() {
    const {onPress, data} = this.props;
    this.setState({selected: !this.state.selected});
    onPress && onPress.call(this, data);
  }
  
  renderSelected() {
    if (this.state.selected) {
      return (
        <Icon
          style={styles.selected_icon}
          name={ 'ios-checkmark' }
          size={ 40 }
          color={ StyleConfig.color_primary }/>
      )
    }
  }
  
  render() {
    let {data} = this.props;
    let bankSource = BankIcons[data.bankcode];
    return (
      <TouchableOpacity style={{flex: 1}} onPress={ () => this.toggleItemSelected() }>
        <View style={styles.bank_item}>
          <Image style={styles.bank_icon} source={bankSource}/>
          <Text style={styles.bank_name}>{data.bankname}</Text>
          {this.renderSelected()}
        </View>
      </TouchableOpacity>
    )
    
  }
}

const styles = StyleSheet.create({
  bank_item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bank_icon: {
    width: 30,
    height: 30,
    marginRight: StyleConfig.space_3,
    marginLeft: StyleConfig.space_3
  },
  bank_name: {
    flex: 1,
    borderBottomColor: StyleConfig.border_color,
    borderBottomWidth: StyleConfig.border_width,
    padding: StyleConfig.space_3
  },
  selected_icon: {
    position: 'absolute',
    right: 15
  }
});


export default Row;