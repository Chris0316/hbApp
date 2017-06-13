/**
 * Created by kim on 2017/6/13.
 */

import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {StyleConfig} from "../style";
class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false
    }
  }

  render() {
    let icon = 'md-checkbox-outline';
    if (this.state.checked) {
      icon = 'md-checkbox';
    }
    const {onChecked, color} = this.props;
    return (
      <TouchableOpacity style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
        <Icon
          onPress={() => {
            let checked = this.state.checked;
            this.setState({
              checked: !checked
            });
            onChecked && onChecked.call(this, !checked)
          }}
          name={ icon }
          size={ 24 }
          color={ color || StyleConfig.color_icon }/>
      </TouchableOpacity>
    )
  }
}

export default CheckBox