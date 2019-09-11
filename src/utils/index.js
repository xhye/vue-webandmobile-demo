import auth from './auth.js'
import date from './date.js'
import environment from './environment.js'
/**
 * 模块Util全部导入此处 方便全局引用
 * this.$utils[模块][方法名] 引用
 */
export default class Utils{
  static auth = auth
  static date = date
  static environment = environment
}
