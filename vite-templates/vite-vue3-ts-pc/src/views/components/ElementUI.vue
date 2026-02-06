<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-05-12 18:11:38
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-05-12 18:59:10
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/views/components/ElementUI.vue
-->
<template>
    <div>
        二次封装ElementUI组件
    </div>
    
    <!-- InputNumber -->
    <div class="input-number">
        <article>
            el-input-number 是一个很好用的组件，它只允许用户输入数字值。但是这个组件会有个默认值，给他赋予一个null 或""的时候会显示0
            并且它这个组件的值是居中显示的，和普通的input 框居左显示不同，这就导致了样式不太统一
        </article>
        <p>改造：让 InputNumber 可以居左显示且没有默认值，用法保持和el-input-number组件相似</p>
        <!-- ElementUI组件 -->
        <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
        <!-- 二次封装组件 -->
        <InputNumber v-model="value" style="width: 200px" />
    </div>
    
    <!-- OptionPlus -->
    <div class="option">
        <p>select 组件用在有较多选项时，但是有些选项的长度难免比较长，就会把选项框整个给撑大，例如：</p>
        <el-select v-model="optionvalue" class="m-2" placeholder="Select">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
        <el-select
            v-model="optionvalue"
            placeholder="请选择"
        >
            <OptionPlus
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :width="200">
            </OptionPlus>
        </el-select>
    </div>
    
    <!-- DrawerPlus -->
    
    
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
</script>

<script lang="ts">
import InputNumber from '../../components/InputNumber.vue'
import OptionPlus from '../../components/OptionPlus.vue'

export default {
    components: {
        InputNumber,
        OptionPlus,
    },
    data () {
      return {
        value: null,
        optionvalue: null,
        options: [{
                value: '选项1',
                label: '黄金糕',
            }, {
                value: '选项2',
                label: '双皮奶特别好吃，以顺德的最出名，推荐尝试',
            }, {
                value: '选项3',
                label: '蚵仔煎',
            }, {
                value: '选项4',
                label: '龙须面',
            }, {
                value: '选项5',
                label: '北京烤鸭',
            }]
      };
    },
    methods: {
    }
};

</script>

<style scoped>

</style>