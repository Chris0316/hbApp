import _ from "lodash";
import * as requestService from "./request";
import * as storageService from "./storage";
import {pageSize, storageKey} from "../config";
import dataApi from "../config/api";

export function login(loginId, password) {
  let fetchApi = dataApi.user.auth;
  let data = `grant_type=password&loginId=${loginId}&password=${password}`.replace(/\+/g, "%2B");
  // let headers = {
  //   'Authorization': "HB APP Basic"
  // };
  return requestService.post(fetchApi, data, {});
}

export function refreshToken(token) {
  let fetchApi = dataApi.user.auth;
  let data = `grant_type=refresh_token&refresh_token=${token}`;
  let headers = {
    'Authorization': "HB APP Basic"
  };
  return requestService.post(fetchApi, data, headers);
}

export function getToken() {
  return storageService.getItem(storageKey.USER_TOKEN);
}

export function getUserInfo() {
  let fetchApi = dataApi.user.info;
  return requestService.get(fetchApi);
}

export function getUserAsset(category, params = {}) {
  params.pageSize = pageSize;
  let fetchApi = dataApi.user[category];
  let strCompiled = _.template(fetchApi);
  fetchApi = strCompiled(params);
  return requestService.get(fetchApi);
}