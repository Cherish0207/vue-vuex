// 主文件的作用一半就是整合操作
// 主文件的作用一般就是整合操作
import { Store, install } from "./store";


// 两种导出引入方式都支持
// 1.默认导入
export default {
  Store,
  install,
};
// 2.采用解构使用
export { Store, install };
