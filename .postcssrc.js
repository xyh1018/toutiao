// postcss.config.js
module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置 autoprefixer 插件
    // 作用：生成浏览器CSS样式规则前缀
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'ios >= 8']
    // },
    // 由于VueCLI内部已经配置了autoprefixer插件，不必重复配置，所以注释此处配置

    // 配置 post-pxtorem 插件
    'postcss-pxtorem': {
      // amfe-flexible的 REM 适配方案是：把屏幕宽度分为 10 份，每份就是十分之一
      // amfe-flexible是配置可伸缩布局方案，主要是将1rem设为viewWidth/10。
      // rootValue：表示根元素字体大小
      // 所以 rootValue 应该设置为使用设计稿宽度的十分之一
      // 但是 Vant 是基于375px写的，所以必须设置为37.5px
      // rootValue: 37.5,
      // rootValue也可以是函数形式：
      rootValue: function ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
        // 这里用 indexOf() 函数来进行条件判断，如果参数file包含'vant'，则rootValue为37.5，否则rootValue为75
      },
      // proList 表示要转换的CSS属性
      // * 表示所有属性都转换
      propList: ['*']
    }
  }
}
