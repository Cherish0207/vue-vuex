#### Q：`Vuex` 为什么无法脱离`Vue`？

- 因为它内部创建了 Vue 实例

#### Q：`vue-router` 调用 `install` 的目的？

- 注册全局组件
- 注册原型方法
- `mixin => router` 实例，绑定给了所有组件

#### Q：`Vuex` 的实现

##### `vuexInit` -- 给每个子组件都增加 `$store` 属性

- `vue-router` 是每个子组件去访问父组件的`$router`属性（把属性定义到了根实例上，所有组件都能拿到这个根，通过根实例获取这个属性）
- `vuex` 是给每个组件都定义一个 `store` 属性, 指向的是同一个对象
- 所有组件都共用了同一个 `store`，状态也是公用的，所有组件都能去操作这个 `store`


##### modules
根模块里可以放子模块 
1.默认模块没有作用域问题 
2.模块内的 state 状态不要和模块的名字相同，否则取的是模块
3.默认模块内的计算属性直接通过 $store.getters.xx 取值,不需要通过 模块名.xx
4.如果增加 `namespaced:true`，会将这个模块的属性（state/getters/mutations/actions）都封装到这个作用域下
