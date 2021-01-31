import Module from "./module";
import { forEach } from "./utils";
export default class ModuleCollections {
  constructor(options) {
    // 递归注册模块
    this.register([], options);
  }
  register(path, rootModule) {
    let newModule = new Module(rootModule)
    if (path.length === 0) {
      this.root = newModule;
    } else {
       let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current);
      }, this.root);
      parent.addChild(path[path.length - 1], newModule)
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (module, moduleName) => {
        this.register([...path, moduleName], module);
      });
    }
  }
}
