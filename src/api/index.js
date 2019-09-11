import wx from './qy.js'
import qyuser from './qyuser.js'

/**
 * 模块api全部导入此处 方便全局引用
 * this.$api[模块][方法名] 引用
 */
export default class Api{
  static wx = wx
  static qyuser = qyuser
}
