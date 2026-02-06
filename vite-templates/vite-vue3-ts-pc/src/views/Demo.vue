<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-25 11:37:57
 * @email: lzl102872@163.com
 * @LastEditors: lizhiliang
 * @LastEditTime: 2024-10-11 11:46:14
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/views/Demo.vue
-->
<template>
    <div>
        这是Demo页面
    </div>
    <!-- SVG -->
    <div class="h-60 mb-8">
      <h3>SVG使用</h3>
      <div class="w-52 h-52 mx-auto mb-4"><vitecamp class="w-52 h-52"></vitecamp></div>
    </div>
    <!-- icon -->
    <h3>Icon</h3>
    <i-mdi-account-reactivate style="font-size: 2em; color: red" />
    <!-- Pinia -->
    <h3>Pinia</h3>
    <p>{{myTheme.themeColor}}</p>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <el-button type="primary" round @click="saveInput">保存数据</el-button>

    <div class="timeline">
      <div class="events">
        <!-- The first `1989` event -->
        <div class="event life">
          <!-- The circle is an svg -->
          <svg
            class="marker"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
          <!-- The event info -->
          <div class="content">
            <time>1993</time>
            <div class="text">
              <p>我出生在江西婺源</p>
            </div>
          </div>
        </div>

        <!-- etc ... -->
        <div class="event life">
          <!-- The circle is an svg -->
          <svg
            class="marker"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
          <!-- The event info -->
          <div class="content">
            <time>2023年</time>
            <div class="text">
              <p>我认识了YHF</p>
            </div>
          </div>
        </div>

        <div class="event life">
          <!-- The circle is an svg -->
          <svg
            class="marker"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
          <!-- The event info -->
          <div class="content">
            <time>2023年10月28日</time>
            <div class="text">
              <p>我和YHF在一起了</p>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
  import vitecamp from '@/assets/svg/vitecamp.svg'
  import theme from '@/store/theme'
  import { useUserStore } from '@/store/user'
  import { ElMessage } from 'element-plus'

  const myTheme = theme()
  myTheme.setThemeType('暗淡色')
  const userStore = useUserStore()
  const input = ref()
  console.log('用户信息', userStore.username)

  const saveInput = () => {
    if (input.value) {
      userStore.editName(input.value)
    } else {
      ElMessage.error('请填写保存信息')
    }
  }
</script>

<!-- <script lang="ts">
import request from "@/utils/request" // request: 

export default {
  mounted() {
    // 测试请求方法
    // request('/api/getUser')
    // 测试mock请求
    request('/api/getList').then((res: any) => {
        console.log(res);
    })

  }
}
</script> -->

<style lang="scss" scoped>
  div {
    font-size: 14px;
    font-family: 'fzsh';
    color: #555;
  }

  // 时间线样式
  // The line in the middle.
  .events::before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    background: var(--color-hr);
  }

  .events {
    // Needed for positioning the line.
    position: relative;
    // Add some space.
    display: flex;
    margin-block: 0.5em;
    flex-direction: column;
    row-gap: 1em;
  }

  .event {
    // Layout content and marker using flexbox.
    display: flex;
    // Align marker vertically.
    align-items: baseline;
  }
  .event .marker {
    // Adjust marker to center on the line.
    position: relative;
    left: -6px;
  }

  // Some coloring to make our life easier.
  .event.life .marker {
    fill: var(--melange_b_yellow);
  }
  .event.programming .marker {
    fill: var(--melange_b_magenta);
  }
  .event.family .marker {
    fill: var(--melange_b_red);
  }
  .content time {
    font-family: concourse_4, Helvetica, sans-serif;
    font-weight: bold;
  }

  @media (min-width: 700px) {
    // Place the line in the middle.
    .events::before {
      left: 50%;
    }
    // Layout the marker after the content.
    .event .marker {
      order: 1;
    }
    .event .content {
      // Make the content take 50% space so the marker
      // will be placed at 50% (on top of the line).
      width: 50%;
      // Event is to the left, align text towards the line.
      text-align: right;
      // Avoid overlap with the marker.
      padding-inline: 1em;
    }
    // For these types, move the event to the right.
    .event:is(.programming, .work, .projects) {
      // Layout the content and marker from right to left.
      flex-direction: row-reverse;

      // Now align text to the left.
      .content {
        text-align: left;
      }
      // We used to offset the marker from the left with -6px,
      // now we need to do it from the other side.
      .marker {
        left: 6px;
      }
    }
  }
</style>