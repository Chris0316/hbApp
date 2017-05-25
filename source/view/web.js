/**
 * Created by kim on 2017/5/25.
 */
import React, {Component} from "react";
import {InteractionManager, StyleSheet, View, WebView} from "react-native";

class WebScene extends Component {

  state: {
    source: Object
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      source: {}
    }
    this.props.navigation.setParams({title: '加载中'})
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({source: {uri: this.props.navigation.state.params.url}})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref='webView'
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={this.state.source}
          onLoadEnd={(e) => this.onLoadEnd(e)}
          scalesPageToFit={true}
        />
      </View>
    );
  }

  onLoadEnd(e: any) {
    if (e.nativeEvent.title.length > 0) {
      this.props.navigation.setParams({title: e.nativeEvent.title})
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  webView: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default WebScene;