/**
 * 防抖：单位时间内只触发最后一次
 * @param {?Number|500} time - 间隔时间
 * @param {Function} fn - Function执行事件
 * @param {?string|'click'} event - Event事件类型
 * @param {Array} binding - Array:[fn,event,time]
*/
const debounce = {
    beforeMount(el: any, binding: any) {
        let [fn, event = 'click', time = 500] = binding.value
        let timer: any
        el.$debounce = () => {
            timer && clearTimeout(timer)
            timer = setTimeout(() => fn(), time)
        }
        el.addEventListener(event, el.$debounce)
    },
    // 指令与元素解绑的时候，移除事件绑定
    unmounted(el: any, binding: any) {
        let [event = 'click'] = binding.value
        el.removeEventListener(event, el.$debounce)
    }
}

export default debounce