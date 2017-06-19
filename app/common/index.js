/**
 * Created by Vickey on 2017/5/24.
 */

import entities from "entities";
import _ from "lodash";

export const logoImage = require('../image/logo.png');

export function decodeHTML(htmlStr) {
  if (htmlStr && htmlStr.length) {
    htmlStr = entities.decodeHTML(htmlStr);
  }
  return htmlStr;
}

export function filterCodeSnippet(codeText) {
  if (codeText && codeText.length) {
    codeText = _.trim(codeText);
    codeText = _.trim(codeText, '&#xD;');
    if (codeText.startsWith(' ') || codeText.endsWith(' ') || codeText.startsWith('&#xD;') || codeText.endsWith('&#xD;')) {
      codeText = filterCodeSnippet(codeText);
    }
  }
  return codeText;
}

export function getImageSource(key = -1) {
  let imageLen = headerImgSource.length;
  if (key < 0 || (key > imageLen)) {
    key = _.random(1, imageLen - 1);
  }
  return headerImgSource[key];
}