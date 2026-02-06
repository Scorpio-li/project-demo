
<template>
  <van-loading></van-loading>
  <van-button round class="retry-button">按钮</van-button>
  <!-- 国际化数据 -->
  <p>{{ $t("message.hello") }}</p>
</template>

<script lang="ts">
export default {
  name: 'VantUi'
}
</script>

<style scoped lang=scss>
  .retry-button {
    width: 100px;
  }
</style>
