/**
 * Created by kim on 2017/6/14.
 */

import React from "react";
import {Image, ListView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BaseView from "../BaseView";
import {StyleConfig} from "../../style";
import * as BankIcons from "../../component/banks";
import bankSource from "../../../data/bank.json";
class Banks extends BaseView {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        r1 !== r2
      }
    });
  }

  componentWillMount() {
    this.setState({
      dataSource: this.ds.cloneWithRows(bankSource)
    });
  }

  selectBank(bank, rowID) {
    let newData = bankSource.slice();
    newData[rowID].selected = true;
    this.setState({
      dataSource: this.ds.cloneWithRows(newData)
    });
  }

  renderRow(row, sessionID, rowID) {
    let bankSource = BankIcons[row.bankcode];
    let renderChecked = () => {
      if (row.selected === true) {
        return (
          <Icon
            style={styles.selected_icon}
            name={ 'ios-checkmark' }
            size={ 40 }
            color={ StyleConfig.color_primary }/>
        )
      }
    };
    return (
      <TouchableOpacity onPress={() => {
        this.selectBank(row, rowID)
      }}>
        <View style={styles.bank_item}>
          <Image style={styles.bank_icon} source={bankSource}/>
          <Text style={styles.bank_name}>{row.bankname}</Text>
          {renderChecked()}
        </View>
      </TouchableOpacity>
    )
  }

  renderBody() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
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


export default Banks;