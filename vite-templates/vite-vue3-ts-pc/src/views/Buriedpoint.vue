<template>
    <div>
        数据埋点
    </div>
    <button @click="clipg">用户点击侧边菜单无现接口需单独触发上报接口</button>
    <button @click="goRefundPsd('save')">用户点击报错触发保存接口，无需单独触发上报接口</button>
</template>

<script setup lang="ts">
// 此时点击侧边菜单是没有现有的接口携带的
// 我们需要手动添加接口上报事件，添加点击事件，传的参数是click，调用我们pvuv的函数方法，取得当前触发事件类型
const clipg = (e: any) => {
    // this.$pvuv.getEvent(e)
}

// 用户点击报错触发保存接口，无需单独触发上报接口
const goRefundPsd = (e: any) => {
    // 参数1：事件类型
    // 参数2：布尔值，用来做判断是否单独触发上报接口
    // this.$pvuv.getEvent(e, true)
}
</script>

<style scoped>

</style>