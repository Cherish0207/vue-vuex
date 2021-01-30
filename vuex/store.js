import applyMixin from "./mixin";
let Vue;
// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    // this.state = options.state
    // 如果直接将 state 定义在实例上, 稍后这个状态发生变化 视图不会更新
    // vue-router只定义了一个属性  => 使用的是 defineReactive

    let state = options.state;
    // vue 中定义数据属性名是有特点的, 如果属性名是通过$xx命名的他不会被代理到 vue的实例上
    // 命名时，如果不需要通过实例去获取这个属性，可以用$xx命名,表示这个属性不被代理到实例上
    // Vuex内部是用$$state
    this._vm = new Vue({
      data() {
        return {
          state: state,
          $state: state,
          $$state: state, // 内部的状态
        };
      },
    });
    console.log(this.state); // {...}
    console.log(this.$state); // undefined
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
