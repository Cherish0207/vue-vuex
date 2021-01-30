import applyMixin from "./mixin";
import { forEach } from "./utils";
let Vue;
// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    let state = options.state;

    // getters:写的是方法,取值是属性
    let getters = options.getters;
    this.getters = {};
    forEach(getters, (fn, key) => {
      Object.defineProperty(this.getters, key, {
        get: () => fn(this.state),
      });
    });
    this._vm = new Vue({
      data() {
        return {
          $$state: state, // 内部的状态
        };
      },
    });
  }
  // 类的属性访间器,当用户去这个实例上去 state属性时会执行此方法
  get state() {
    return this._vm._data.$$state;
  }
}
// 把Vue绑定到当前作用域下
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(_Vue);
};
export { Store, install };
