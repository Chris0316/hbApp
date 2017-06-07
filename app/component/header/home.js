/**
 * Created by kim on 2017/5/26.
 */

import React, {Component} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";

import _ from "lodash";
// import PureRenderMixin from "react-addons-pure-render-mixin";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import {getImageSource} from "../../common";
import Navbar from "../navbar";

import {CommonStyles, ComponentStyles, StyleConfig} from "../../style";

class HomeRender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cover: null
    };
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const cover = getImageSource();
    this.setState({
      cover: cover
    });
  }

  componentWillUnmount() {
    this.setState({
      cover: null
    });
  }

  renderParallaxScrollComponent() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
      </ScrollView>
    )
  }

  renderParallaxBackground() {
    return (
      <View>
        <Image
          resizeMode="cover"
          style={ [ComponentStyles.header_img] }
          source={ this.state.cover }>
        </Image>
        <View style={ [ComponentStyles.header_backdrop] }/>
      </View>
    )
  }

  renderPostInfo() {
    const postTitle = _.truncate('我的收藏我的收藏我的收藏我的收藏我的收藏我的收藏 ', {length: 20});
    return (
      <View style={[CommonStyles.m_b_4]}>
        <Text style={ [CommonStyles.text_white, CommonStyles.font_eg, CommonStyles.line_height_lg, CommonStyles.text_left] }>
          { postTitle }
        </Text>
      </View>
    )
  }

  renderParallaxForeground(postInfo) {
    return (
      <View style={ [CommonStyles.flexColumn, CommonStyles.flexItemsCenter, CommonStyles.p_a_3, styles.foreground] }>
        { this.renderPostInfo(postInfo) }
      </View>
    )
  }

  renderParallaxStickyHeader() {
    return (
      <Navbar
        backgroundImage={ this.state.cover }
        leftIconOnPress={ () => alert('L') }
        title='标题'/>
    );
  }

  render() {
    return (
      <ParallaxScrollView
        headerBackgroundColor={ StyleConfig.color_dark }
        stickyHeaderHeight={ StyleConfig.navbar_height }
        parallaxHeaderHeight={ StyleConfig.header_height }
        renderScrollComponent={() => this.renderParallaxScrollComponent()}
        renderBackground={() => this.renderParallaxBackground()}
        renderForeground={() => this.renderParallaxForeground()}
        renderStickyHeader={() => this.renderParallaxStickyHeader()}>
        { this.props.children }
      </ParallaxScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  foreground: {
    height: StyleConfig.header_height,
    paddingTop: StyleConfig.space_4
  },
  header_meta: {
    bottom: 0,
    width: StyleConfig.width
  }
});

export default HomeRender;