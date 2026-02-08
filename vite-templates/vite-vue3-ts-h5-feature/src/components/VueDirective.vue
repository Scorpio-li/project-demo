<template>
  <h3>自定义指令模块</h3>
  <van-button type="primary" v-copy='`湿哒哒沙雕`'>拷贝按钮</van-button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
        name: 'VueDirective',
        components:{  },
        setup:()=>{
            onMounted(() => {
            console.log('第一次加载')
        })
    
        return{
        
        }

    },
    computed:{
    }
})
</script>