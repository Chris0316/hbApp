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
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  modal_header_text: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: StyleConfig.border_width,
    borderBottomColor: StyleConfig.border_color,
    fontSize: 17
  },
  modal_header_close: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  modal_body: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15
  },
  modal_body_no_header: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  modal_body_no_footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  modal_footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },

  modal_footer_btn: {
    borderTopWidth: StyleConfig.border_width,
    borderTopColor: StyleConfig.border_color,
    flex: 1,
    padding: 10
  },
  modal_footer_btn_text_confirm: {
    color: '#4883f6'
  },
  modal_footer_btn_text: {
    textAlign: 'center',
    fontSize: 17
  },
  modal_footer_btn_confirm: {
    borderLeftWidth: StyleConfig.border_width,
    borderLeftColor: StyleConfig.border_color
  },
  modal_btn: {
    width: StyleConfig.screen_width - 20 * 2 - 15 * 2
  }
});