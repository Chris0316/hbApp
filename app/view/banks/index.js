/**
 * Created by kim on 2017/6/14.
 */

import React from "react";
import {ListView} from "react-native";
import BaseView from "../BaseView";
import Row from "./row";
class Banks extends BaseView {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return true
      }
    });
    this.state = {
      ds
    }
  }

  componentWillMount() {
    let bankSource = require('../../../data/bank.json');
    this.setState({
      ds: this.state.ds.cloneWithRows(bankSource)
    })
  }

  selectBank(bank) {
    const {router, callback} = this.props;
    callback(bank);
    router.pop();
  }

  renderRow(row) {
    const {bankcode} = this.props;
    let selected = false;
    if (row.bankcode === bankcode) {
      selected = true
    }
    return (
      <Row data={row} selected={selected} onPress={this.selectBank.bind(this)}/>
    );
  }

  renderBody() {
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}
export default Banks;