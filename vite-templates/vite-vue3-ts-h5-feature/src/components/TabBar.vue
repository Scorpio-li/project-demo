<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 15:06:42
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 15:07:34
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/components/TabBar.vue
-->
<script lang="ts">
export default{
    name: 'TabBar'
}
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'

    interface tabProps {
        data?: [
			{
				title: string
				to: string
				name: string
				icon: string
			}
        ]  
    }

    const props = defineProps<tabProps>()
	 	 console.log(props.data,'props.data');
	
    
    const emit = defineEmits(['chang'])

    const active = ref('home')

    const onChange = (value) => {	
		// console.log(value,'value');
		
        emit('chang', value)   
    }

</script>

<template>
	<div>
		<van-tabbar fixed route v-model="active"  @change="onChange">
			<van-tabbar-item v-for="(item, index) in props.data" :to="item.to" :name="item.name" :key="index" :icon="item.icon">{{item.title}}</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<style lang="scss" scoped>

</style>