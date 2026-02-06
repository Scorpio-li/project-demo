<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 16:34:26
 * @LastEditTime: 2024-07-10 16:35:28
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <!-- 顶部 -->
                <v-header />
                <v-tags />
            </el-header>
            <el-container>
                <!-- 侧边栏：菜单栏 -->
                <v-sidebar class="siderbar" />
                <!-- 主要内容 -->
                <el-main>
                    <router-view v-slot="{ Component }">
                        <transition name="move" mode="out-in">
                            <keep-alive :include="tags.nameList">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import vHeader from './components/header/index.vue'
import vSidebar from './components/sidebar/index.vue'
import vTags from './components/tags/index.vue'
import { useTagsStore } from '@/store/tags'

const tags = useTagsStore()
console.log('标签', tags)
</script>
