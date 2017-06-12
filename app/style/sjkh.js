/**
 * Created by kim on 2017/6/12.
 */
import {Dimensions, StyleSheet} from "react-native";
import {StyleConfig} from "./index";
const {height, width} = Dimensions.get('window');

export const SjkhStyles = StyleSheet.create({
  tips_block: {
    color: StyleConfig.color_black,
    padding: StyleConfig.space_2,
    fontSize: StyleConfig.font_xs,
    backgroundColor: '#f7f7f7'
  }
});