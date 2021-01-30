import applyMixin from './mixin'
let Vue;
class Store {
  constructor(options) {
    console.log(options);
  }
}
// 把Vue绑定到当前作用域下
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(_Vue)
};
export { Store, install };
