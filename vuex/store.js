import applyMixin from "./mixin";
import { forEach } from "./utils";
let Vue;
// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    let state = options.state;

    // getters:写的是方法,取值是属性
    this.getters = {};
    this._mutations = {};
    this._actions = {};
    // 通过计算属性实现懒加载
    const computed = {};
    forEach(options.getters, (fn, key) => {
      computed[key] = () => fn(this.state);
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key],
      });
    });
    forEach(options.mutations, (fn, key) => {
      this._mutations[key] = (payload) => fn.call(this, this.state, payload);
    });
    forEach(options.actions, (fn, key) => {
      this._actions[key] = (payload) => fn.call(this, this, payload);
    });
    this._vm = new Vue({
      data() {
        return {
          $$state: state, // 内部的状态
        };
      },
      computed,
    });
  }
  // 类的属性访间器,当用户去这个实例上去 state属性时会执行此方法
  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this._mutations[type](payload);
  }
  dispatch = (type, payload) => {
    this._actions[type](payload);
  };
}
// 把Vue绑定到当前作用域下
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(_Vue);
};
export { Store, install };
