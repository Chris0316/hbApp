/**
 * Created by kim on 2017/6/8.
 */

import * as View from "../view";
const ViewPage = {
  getRoute: (routeName) => {
    let view = ViewPage[routeName], options = {}, route = {};
    if (!view) {
      return null;
    }
    let page = view();
    let routePrefix = ['name', 'component', 'sceneConfig'];
    for (let key in page) {
      if (routePrefix.indexOf(key) > -1) {
        route[key] = page[key];
      } else {
        options[key] = page[key];
      }
    }
    return {
      route, options
    }
  },
  startup: () => {
    return {
      component: View.startup,
      name: 'startup'
    }
  },

  web: () => {
    return {
      component: View.web,
      name: 'web'
    }
  },
  openAccount: () => {
    return {
      title: '开户须知',
      component: View.openAccount,
      name: 'openAccount'
    }
  },

  phoneNumberVerify: () => {
    return {
      title: '验证手机',
      component: View.phoneNumberVerify,
      name: 'phoneNumberVerify'
    }
  },
  personInfo: () => {
    return {
      title: '个人信息确认',
      component: View.personInfo,
      name: 'personInfo'
    }
  },
  uploadPhoto: () => {
    return {
      title: '上传身份证',
      component: View.uploadPhoto,
      name: 'uploadPhoto'
    }
  },

  setPwd: () => {
    return {
      title: '设置密码',
      component: View.setPwd,
      name: 'setPwd'
    }
  },
  login: () => {
    return {
      title: '登录',
      component: View.login,
      name: 'login'
    }
  },

  thirdDepository: () => {
    return {
      title: '三方存管',
      component: View.thirdDepository,
      name: 'thirdDepository'
    }
  },

  banks: () => {
    return {
      title: '银行选择',
      component: View.banks,
      name: 'banks'
    }
  },
  phoneToukerRegister: () => {
    return {
      title: '注册投客网',
      component: View.phoneToukerRegister,
      name: 'phoneToukerRegister'
    }
  }
};

export default ViewPage;