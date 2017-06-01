/**
 * Created by Vickey on 2017/5/24.
 */

import entities from "entities";
import _ from "lodash";

const headerImgSource = [

  require('../image/header/1.jpg'),
  require('../image/header/2.jpg'),
  require('../image/header/3.jpg'),
  require('../image/header/4.jpg'),
  require('../image/header/5.jpg'),
  require('../image/header/6.jpg'),
  require('../image/header/7.jpg'),
  require('../image/header/8.jpg'),
  require('../image/header/9.jpg'),
  require('../image/header/10.jpg'),
  require('../image/header/11.jpg')
];

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