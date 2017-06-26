/**
 * Created by kim on 2017/6/6.
 */

import AV from "leancloud-storage";
const leanCloud = {
  saveObject(collection, obj) {
    let object = AV.Object.new(collection);
    object.set('text', obj.text);
    return object.save();
  },
  removeObj(collection, obejctId){
    let object = AV.Object.createWithoutData(collection, obejctId);
    return object.destroy();
  },
  fetchObject(collection) {
    let query = new AV.Query(collection);
    query.descending('createdAt');
    return query.find();
  }
};
export default leanCloud;