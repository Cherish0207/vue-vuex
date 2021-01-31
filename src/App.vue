<template>
  <div id="app">
    珠峰的年齡: {{ $store.state.age }} <br />
    <button @click="$store.state.age += 10">age+10</button>
    我的年龄: {{ $store.getters.getAge }} <br />
    <button @click="$store.commit('a/changeAge', 5)">同步更新a的状态</button>
    <button @click="$store.commit('changeAge', 5)">同步更新状态</button>
    <button @click="$store.dispatch('changeAge', 5)">异步更新状态</button><br>
    <span>{{$store.state.a.c}}</span>
    <span>{{$store.state.b.d}}</span>
    <span>{{$store.getters.getD}}</span>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
