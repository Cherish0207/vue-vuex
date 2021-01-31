import applyMixin from "./mixin";
import ModuleCollections from "./module-collections";
import { forEach } from "./utils";
let Vue;
// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    // 格式化用户传参
    this._modules = new ModuleCollections(options)
    console.log(this._modules);
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
