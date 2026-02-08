/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-12 16:34:54
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-12 16:36:36
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/postcss.config.js
 */
const autoprefixer = require('autoprefixer')
const px2viewport = require('postcss-px-to-viewport-8-plugin')

const basePx2viewport = {
  unitToConvert: 'px', // 需要转换的单位，默认为 px
  // viewportWidth: 750, // 设计稿的视口宽度
  unitPrecision: 3, // 单位转换后保留的精度（很多时候无法整除）
  propList: [
    '*'
    //  '!font-size'
  ], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
  viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
  fontViewportUnit: 'vw', // 字体使用的视口单位
  // 指定不转换为视口单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名
  // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  // 下面配置表示类名中含有'keep-px'以及'.ignore'类都不会被转换
  selectorBlackList: ['.ignore', 'keep-px'],
  minPixelValue: 1, // 设置最小的转换数值，这里小于或等于 1px 不转换为视口单位
  mediaQuery: false, // 媒体查询里的单位是否需要转换单位
  exclude: [/node_modules/] // 忽略某些文件夹下的文件或特定文件
  // include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
}

module.exports = {
  plugins: [
    autoprefixer(),
    // vant
    px2viewport({
      ...basePx2viewport,
      viewportWidth: 375,
      exclude: [/^(?!.*node_modules\/vant)/]
      // include: [/node_modules\/vant/],
    })
    // // 非vant
    // px2viewport({
    //   ...basePx2viewport,
    //   viewportWidth: 750,
    //   exclude: [/node_modules\/vant/]
    // })
  ]
}

// module.exports = {
//   plugins: {
//     'postcss-px-to-viewport-8-plugin': {
//       unitToConvert: 'px', // 需要转换的单位，默认为"px"
//       viewportWidth: 750, // 设计稿的视口宽度
//       exclude: [/node_modules/], // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件
//       unitPrecision: 5, // 单位转换后保留的精度
//       propList: ['*'], // 能转化为vw的属性列表
//       //propList: ['*', '!font-size'],        // 能转化为 vw 的属性列表
//       viewportUnit: 'vw', // 希望使用的视口单位
//       fontViewportUnit: 'vw', // 字体使用的视口单位
//       selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
//       minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
//       mediaQuery: false, // 媒体查询里的单位是否需要转换单位
//       replace: true, //  是否直接更换属性值，而不添加备用属性
//       landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
//       landscapeUnit: 'vw', // 横屏时使用的单位
//       landscapeWidth: 1125 // 横屏时使用的视口宽度
//     }
//   }
// }
