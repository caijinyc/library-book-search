const store = {
  storage: window.localStorage
};

const api = {
  /**
   * 1. storage.get(key) 返回值
   *   - 如果 key 对应将 string 反序列化后返回
   *   - 如果 key 没有对应值，就返回 def，如果没有 def 那就返回 undefined
   */
  get (key, def) {
    if (!def) {
      def = undefined;
    }
    let val = this.storage.getItem(key);
    return val ? deserialize(val) : def;
  },
  /**
   *  1.如果 val 为 undefined 那么就返回 false，存储失败
   *  2. 如果为正确的值的话，就转义并存储
   */
  set (key, val) {
    if (val === undefined) {
      return false;
    } else {
      this.storage.setItem(key, serialize(val));
      return true;
    }
  },
  /**
   * 
   */
  remove (key) {
    this.storage.remove(key);
  }
};

function deserialize (payload) {
  if (!payload) {
    return undefined;
  } else {
    return JSON.parse(payload);
  }
}

function serialize (payload) {
  if (!payload) {
    return undefined;
  } else {
    return JSON.stringify(payload);
  }
}

Object.assign(store, api);

export default store;