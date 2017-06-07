import React, {AsyncStorage} from "react-native";

const storage = {
  setItem(key, value) {
    if (key && value) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }
  },
  mergeItem(key, value) {
    if (key && value) {
      return AsyncStorage.mergeItem(key, JSON.stringify(value));
    }
  },

  getItem(key) {
    return AsyncStorage.getItem(key)
      .then(function (value) {
        return JSON.parse(value)
      });
  },

  multiGet(keys) {
    return AsyncStorage.multiGet(keys)
      .then(results => {
        return results.map(item => {
          return [item[0], JSON.parse(item[1])]
        })
      });
  },
  multiRemove(keys) {
    return AsyncStorage.multiRemove(keys)
  },
  removeItem: AsyncStorage.removeItem,
  clear: AsyncStorage.clear
};

export default storage;