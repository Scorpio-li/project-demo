import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import' // vantUI按需引入
import viteCompression from 'vite-plugin-compression' // 代码压缩

// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
	loadEnv(mode, process.cwd()) 
  return {
    plugins: [
      vue(),
      vueJsx({}),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        ext: '.br', // .gz：使用br压缩代码
        algorithm: 'brotliCompress',  //gzip
        deleteOriginFile: false
      }),
      styleImport({
        resolves: [VantResolve()], // 按需引入vant
      })
    ],
    // 静态资源基础路径 base: './' || '',
		base:'./',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build:{
      // outDir: loadEnv(mode, process.cwd()).VITE_APP_OUT_DIR,
      // assetsDir:"static",
      terserOptions:{
        compress: {
          drop_console: true, // 移除掉debugger/console
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "@/style/global.less";', // 加载全局样式，使用less特性
          javascriptEnabled: true // 支持less嵌入js文件 
        },
        // 引入公用的样式
        scss: {
          additionalData: `@import "@/style/global.scss";@import "@/style/variables.scss";`,
        }
      }
    },
    // 跨域代理
    server: {
      port: 3000,
      open: true,
      proxy: { // 代理
        // '/api': {
        //   target: 'http://API网关所在域名',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
    }
  }
})
