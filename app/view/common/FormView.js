/**
 * Created by kim on 2017/6/23.
 */

import React from "react";
import BaseView from "./BaseView";
import Toast from "@remobile/react-native-toast";

class FormView extends BaseView {

  /**
   * 输入校验
   * @returns {boolean}
   */
  validator() {
    return true;
  }

  /**
   * 提交请求
   */
  doSubmit() {

  }

  onSubmit() {
    const messsage = this.validator();
    if (messsage !== true) {
      Toast.show(messsage);
      return
    }
    this.doSubmit();
  }
}

export default FormView