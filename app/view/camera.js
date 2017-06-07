/**
 * Created by kim on 2017/6/7.
 */
import React, {Component} from "react";
import Camera from "react-native-camera";
import {StyleSheet, Text, View} from "react-native";

class TakePhtoto extends Component {
  constructor(props) {
    super(props);
  }

  takePicture() {
    let {navigation} = this.props;
    this.camera.capture()
      .then(data => {
        navigation.navigate('home', {
          'photo': data
        });
      }).catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          playSoundOnCapture={false}
          captureQuality={'low'}
          aspect={Camera.constants.Aspect.fit}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


export default TakePhtoto