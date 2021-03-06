import { forEach } from "./utils";

export default class Module {
  constructor(rootModule) {
    this._rawModule = rootModule;
    this._children = {};
    this.state = rootModule.state;
  }
  addChild(key, module) {
    this._children[key] = module;
  }
  getChild(key) {
    return this._children[key];
  }
  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEach(this._rawModule.mutations, fn);
    }
  }
  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEach(this._rawModule.actions, fn);
    }
  }
  forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEach(this._rawModule.getters, fn);
    }
  }
  forEachChild(fn) {
    forEach(this._children, fn);
  }
}
