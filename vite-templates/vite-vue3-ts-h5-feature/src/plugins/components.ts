/**
 * 由于sfc语法糖没有携带组件的name属性，
 * 上面的curComponent.name会报curComponent下没有name属性，
 * 此时需要在注册的公共组件中加上如下代码，比如在src/components/CustomHeader.vue中加上如下代码
 * 这样组件的实例对象中就会有name属性
    <script lang="ts">
    export default{
        name: ''
    }
    </script>
*/

const modules = import.meta.globEager('../components/*.vue')

export default {
    install(app: any) {
        Object.keys(modules).forEach(componentPath => {
            // 获取遍历的当前组件实例对象
            let curComponent = modules[componentPath]?.default 
            app.component(curComponent.name, curComponent);
        })
    }
}


