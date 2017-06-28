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
  editObj(collection, obejctId, text){
    let object = AV.Object.createWithoutData(collection, obejctId);
    object.set('text', text);
    return object.save();
  },
  fetchObject(collection) {
    let query = new AV.Query(collection);
    query.descending('createdAt');
    return query.find();
  },
  fetchMore(collection, pageNo = 1, pageSize = 10) {
    let query = new AV.Query(collection);
    query.skip((pageNo - 1) * pageSize);
    query.limit(pageSize);
    query.descending('createdAt');
    return query.find();
  },
  getCount(collection){
    let query = new AV.Query(collection);
    return query.count();
  }
};
export default leanCloud;