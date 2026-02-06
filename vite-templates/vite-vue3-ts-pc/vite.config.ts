/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2023-08-15 10:02:57
 * @LastEditTime: 2024-09-13 16:12:13
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path' // 编辑器提示 path 模块找不到，可以yarn add @types/node --dev
import presets from './presets/presets'
import { buildLifeHook } from './plugins/buildLifeHooks';

console.log('presets', presets)
// https://vitejs.dev/config/
export default defineConfig((env: any) => {
  // env 环境变量
  const viteEnv = loadEnv(env.mode, `.env.${env.mode}`)
  
  return {
    base: viteEnv.VITE_BASE,
    // 插件
    plugins: [presets(env), buildLifeHook()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        '#': resolve(__dirname, 'types'),
        '~/': `${resolve(__dirname, 'src')}/`
      }
    },
    // 服务代理 server
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 9527, // 端口号
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      // 接口代理
      proxy: {
        '/api': {
          // 本地 8000 前端代码的接口 代理到 8888 的服务端口
          target: 'https://apifoxmock.com/m1/4838822-4493962-default/',
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace('/api/', '/'),
        },
      }
    },
    // 打包配置
    build: {
      minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          drop_console: false, // 去除console
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true, // 去除vconsole 调试 
        },
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      }
    },
    css: {
      preprocessorOptions: {
        // 全局引入了 scss 的文件
        scss: {
          additionalData: `
          @import "@/styles/index.scss";
        `,
          javascriptEnabled: true,
        },
      },
    }
  }
})
