import React, {Dimensions, PixelRatio} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import buildStyleInterpolator from "react-native/Libraries/Utilities/buildStyleInterpolator";

const {width} = Dimensions.get('window');

const baseConfig = Navigator.SceneConfigs.PushFromRight;

const popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
  edgeHitWidth: width / 4
});

const fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom.gestures.pop, {
  edgeHitWidth: width
});

const NativeFadeToTheLeft = {
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
  opacity: {
    from: 1,
    to: 0.3,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },
  translateX: {
    from: 0,
    to: -Math.round(Dimensions.get('window').width * 0.3),
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },
};

const NativeFromTheRight = {
  opacity: {
    value: 1.0,
    type: 'constant',
  },
  shadowColor: {
    value: '#000000',
    type: 'constant',
  },

  shadowOpacity: {
    from: 0.1,
    to: 0.5,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100,
  },

  shadowRadius: {
    from: 2,
    to: 6,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
  },

  transformTranslate: {
    from: {x: Dimensions.get('window').width, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  },

  translateX: {
    from: Dimensions.get('window').width,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get(),
  }
};

export const customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom, {
  gestures: {
    pop: fullPopGestureConfig
  }
});

export const customPushFromRight = Object.assign({}, baseConfig, {
  gestures: null,
  // gestures: {
  //   pop: popGestureConfig
  // },
  animationInterpolators: {
    into: buildStyleInterpolator(NativeFromTheRight),
    out: buildStyleInterpolator(NativeFadeToTheLeft),
  }
});

