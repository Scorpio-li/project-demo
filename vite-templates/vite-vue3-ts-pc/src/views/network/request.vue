<template>
    <p>页面接口请求</p>
    
</template>

<script setup lang="ts">
import { login } from '@/api/user'

// 用户登录
async function userLogin() {
    const res: any = await login({
        username: 'admin',
        password: '123456'
    })

    if (res.code === 200) {
        // setUserInfo(res)
        return true
    }
    return false
}
userLogin()
</script>

<style scoped>

</style>