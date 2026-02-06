import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression' // 代码压缩
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-md'
import { ConfigEnv } from 'vite'
import { resolve } from 'path'

export default (env: ConfigEnv) => {
    return [
        vue(),
        vueJsx(),
        svgLoader(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        }),
        viteMockServe({ supportTs: true, mockPath: 'mock' }), // js发开，则需要配置 supportTs 为 false
        AutoImport({
            dts: './src/auto-imports.d.ts',
            imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
            // Generate corresponding .eslintrc-auto-import.json file.
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            dts: './src/components.d.ts',
            // imports 指定组件所在位置，默认为 src/components
            dirs: ['src/components/'],
            resolvers: [ElementPlusResolver(), IconsResolver(), VueUseComponentsResolver()],
        }),
        Icons({
            compiler: 'vue3',
            autoInstall: true,
        }),
        WindiCSS(),
        Markdown()
    ]
}