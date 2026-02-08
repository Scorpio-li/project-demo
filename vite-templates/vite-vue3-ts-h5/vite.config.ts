/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2023-07-31 09:59:48
 * @LastEditTime: 2023-07-31 18:54:04
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression' // 代码压缩
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
// import path from 'path'

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
        '@': resolve(__dirname, 'src')
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
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true // 去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      preprocessorOptions: {
        // less: {
        //   charset: false,
        //   additionalData: '@import "@/style/global.less";', // 加载全局样式，使用less特性
        //   javascriptEnabled: true // 支持less嵌入js文件
        // },
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
      proxy: {
        // 代理
        '/api': {
          target: 'http://API网关所在域名',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
