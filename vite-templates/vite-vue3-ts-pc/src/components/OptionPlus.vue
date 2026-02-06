<template>
    <el-option
        :style="`width: ${width}px`"
        v-bind="$attrs"
    >
        <slot />
    </el-option>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
        },
    },
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
    min-height: 35px;
    height: auto;
    white-space: initial;
    overflow: hidden;
    text-overflow: initial;
    line-height: 25px;
    padding: 5px 20px;
}
</style>
