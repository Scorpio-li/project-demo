
/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
// 不关心外部库的类型，并且希望将所有没有类型的库导入为any
declare module '*.jsx'

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_API_BASE_URL: string
    readonly VITE_BUILD_SOURCEMAP: string
    readonly VITE_BUILD_DROP_CONSOLE: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}