/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2025-01-26 15:15:55
 * @LastEditTime: 2025-01-26 17:16:37
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// vite.config.ts

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression' // 代码压缩
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
// postcss8 插件
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin"
// 虽然postcss-px-to-viewport-8-plugin做适配，但是行内样式不能转换为vw，所以我们自定义个插件，将内样式px转成vw
import vitePluginStyleVwLoader from "./src/plugins/vite-plugin-style-vw-loader"
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd())
  // 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
  // loadEnv(mode, process.cwd())
  return {
    define: {
      'process.env': env
    },
    plugins: [
      // 该插件需要放在vue()之前
      vitePluginStyleVwLoader({
        unitToConvert: "px",
        viewportWidth: 375,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        minPixelValue: 1,
      }),
      vue(),
      vueJsx({}),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        ext: '.br', // .gz：使用br压缩代码
        algorithm: 'brotliCompress', //gzip
        deleteOriginFile: false
      }),
      Components({
        resolvers: [VantResolver({ importStyle: false })] // 按需引入vant
      }),
      // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
      // 还可配置entry入口文件， inject自定义注入数据等
      createHtmlPlugin(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
        dts: 'src/auto-import.d.ts',
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        // 'vue-global-api'这个插件仅仅解决vue3 hook报错
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json', // 生成的文件路径
          globalsPropValue: true
        }
      })
    ],
    // 静态资源基础路径 base: './' || '',
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@views': resolve(__dirname, 'src/views'),
        '@router': resolve(__dirname, 'src/router'),
        '@stores': resolve(__dirname, 'src/stores'),
        '@components': resolve(__dirname, 'src/components'),
      }
    },
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      // outDir: env.VITE_APP_OUT_DIR,
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      // assetsDir:"static",
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          // pure_funcs: ['console.log'], // 只删除 console.log 
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true // 去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          postcsspxtoviewport8plugin({
            unitToConvert: "px", // 需要转换的单位，默认为 px
            viewportWidth: 375, // UI设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ["*"], // 能转化为vw的属性列表
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: "vw", // 横屏时使用的单位
            landscapeWidth: 1024, // 横屏时使用的视口宽度
          }),
          // // vant
          // postcsspxtoviewport8plugin({
          //   viewportWidth: 375, // 设计稿的视口宽度
          //   viewportUnit: 'vw',
          //   exclude: [/^(?!.*node_modules\/vant)/] //忽略除vant之外的
          //   // include: [/node_modules\/vant/],
          // })
        ]
      },
      preprocessorOptions: {
        // 引入公用的样式
        scss: {
          additionalData: `@import "@/style/global.scss";@import "@/style/variables.scss";`
        }
      }
    },
    // 跨域代理
    server: {
      port: 3000,
      open: true,
      cors: true, // 允许跨域
      host: "0.0.0.0", // 解决  Network: use --host to expose
      proxy: {
        // 代理
        '/api': {
          target: 'http://API网关所在域名',
          changeOrigin: true,
          secure: false,      // 支持https
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
