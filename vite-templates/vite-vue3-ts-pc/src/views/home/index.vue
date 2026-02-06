<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 18:27:38
 * @LastEditTime: 2024-09-10 14:53:33
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
    <MyEchart :options="options" style="height: 300px"></MyEchart>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  import MyEchart from '@/components/echarts/MyEchart.vue'
  import { prettyLog } from '@/utils/printLog'

  const options = reactive({
    title: {
      text: '访问来源',
      subtext: 'Fake Data',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
  
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  // 创建打印对象
  const log = prettyLog();
  // 不带标题
  log.info('这是基础信息!');
  //带标题
  log.info('注意看', '这是个男人叫小帅!');
  // 错误信息打印
  log.error('奥德彪', '出来的时候穷 生活总是让我穷 所以现在还是穷。');
  log.error('前方的路看似很危险,实际一点也不安全。');
  // 成功与警告信息
  log.warning('奥德彪', '我并非无路可走 我还有死路一条! ');
  log.success('奥德彪', '钱没了可以再赚，良心没了便可以赚的更多。 ');
  // 图片打印
  log.picture('https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&thumbnail=660x2147483647&quality=80&type=jpg');
  const data: any = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  log.table(data);

  </script>
  
  