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
  },
  
  link: {
    fontSize: 12,
    color: '#4B83F4'
  },
  
  modal: {},
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -50
  },
  modal_header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: StyleConfig.border_width,
    borderBottomColor: StyleConfig.border_color
  },
  modal_body: {
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15
  },
  modal_footer: {},
  modal_btn: {
    width: StyleConfig.screen_width - 20 * 2 - 15 * 2
  }
});