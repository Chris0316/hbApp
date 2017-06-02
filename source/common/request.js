/**
 * Created by kim on 2017/6/2.
 */
import _ from "lodash";

export const request = (url, method, body) => {
  let isOk, headers = {}, data = body;
  if (method === 'post') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (_.isObject(data)) {
      let temp = [];
      _.forIn(data, (val, key) => {
        temp.push(key + '=' + val);
      })
      data = temp.join('&');
    }
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers,
      body: data
    }).then((response) => {
      if (response.ok) {
        isOk = true;
      } else {
        isOk = false;
      }
      return response.json();
    }).then((responseData) => {
      if (isOk) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};