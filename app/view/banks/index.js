/**
 * Created by kim on 2017/6/14.
 */

import React from "react";
import {Image, ListView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BaseView from "../BaseView";
import {StyleConfig} from "../../style";
import Bank from "../../../data/bank.json";
import * as BankIcons from "../../component/banks"

class Banks extends BaseView {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      selectedIndex: -1,
      dataSource: this.ds.cloneWithRows(Bank)
    };
  }
  
  selectBank(rowID) {
    let newData = Bank;
    newData[rowID].selected = true;
    this.setState({
      selectedIndex: rowID,
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });
  }
  
  renderRow(row, sessionID, rowID) {
    let bankSource = BankIcons[row.bankcode]
    let renderChecked = () => {
      if (this.state.selectedIndex === rowID) {
        return (
          <Icon
            style={{marginRight: 15}}
            name={ 'ios-checkmark' }
            size={ 40 }
            color={ StyleConfig.color_primary }/>
        )
      }
    };
    return (
      <TouchableOpacity onPress={() => {
        this.selectBank(rowID)
      }}>
        <View style={styles.bank_item}>
          <Image style={styles.bank_icon}
                 source={bankSource}/>
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
  }
});


export default Banks;