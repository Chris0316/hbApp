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
    let routePrefix = ['name', 'component'];
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
  }
};

export default ViewPage;