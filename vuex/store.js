import applyMixin from "./mixin";
import ModuleCollections from "./module-collections";
import { forEach } from "./utils";
let Vue;
// 最终用户拿到的是这个类的实例

function installModule(store, rootState, path, module) {
  console.log(path);
  // 如果是子模块,就需要将子模块的状态定义到根模块上
  if(path.length > 0) {
    // rootState[[path[path.length - 1]]] = module.state
    // vue.set 会区分是不是响应式数据 可以新增属性 如果本身对象不是响应式会直接复制
    // Vue.set(rootState, path[path.length - 1], module.state)
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    Vue.set(parent, path[path.length - 1], module.state)
  }
  module.forEachMutation((mutation, type) => {
    store._mutations[type] = store._mutations[type] || [] // 发布订阅模式
    store._mutations[type].push((payload) => { // 函数包装 -- 传参 paypoad
      mutation.call(store, module.state, payload)
    })
  });
  module.forEachAction((action, type) => {
    store._actions[type] = store._actions[type] || []
    store._actions[type].push((payload) => { // 函数包装 -- 传参 paypoad
      action.call(store, store, payload)
    })
  });
  module.forEachGetter((getter, key) => {
    // 如果 getters 重名会覆盖,所有的模块的 getters 都会定义到根模块上
    store._wrapperGetters[key] = function() {
      return getter(module.state)
    }
  });
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child);
  });
}
class Store {
  constructor(options) {
    // 格式化用户传入的参数,格式化成树形结构更直观一些,后续也更好操作一些
    // 1.收集模块转换成一颗树
    this._modules = new ModuleCollections(options);
    // 2.安装模块, 将模块上的属性定义在我们的store中
    const state = this._modules.root.state;
    this._mutations = {}; // 存放所有模块中的 mutations
    this._actions = {}; // 存放所有模块中的 actions
    this._wrapperGetters = {}; // 存放所有模块中的 getters
    installModule(this, state, [], this._modules.root);
    console.log(this._mutations);
    console.log(this._actions);
    console.log(this._wrapperGetters);
    console.log(state);
  }
  // 类的属性访间器,当用户去这个实例上去 state属性时会执行此方法
  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this._mutations[type](payload);
  };
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
