const applyMixin = function(Vue) {
  Vue.mixin({
    beforeCreate: vuexInit
  })
}
// vue 组件的创建顺序，是先父后子
function vuexInit() {
  const options = this.$options
  // 根实例
  if(options.store) {
    this.$store = options.store
  } else if(options.parent && options.parent.$store){
    // 子组件
    this.$store = options.parent.$store
  }
}
export default applyMixin