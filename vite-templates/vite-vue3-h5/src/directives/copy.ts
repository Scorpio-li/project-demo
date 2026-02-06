// import { showToast } from 'vant';
const copy: object = {
  beforeMount(el: any, binding: any) {
    el.$value = binding.value
    el.$copyToClipboard = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      const content = binding.value instanceof Function ? binding.value() : binding.value;
      navigator.clipboard.writeText(content).then(
        () => {
          console.log('复制成功');
          // 可以在这里添加复制成功的回调
        },
        (error) => {
          console.error('复制失败', error);
          // 可以在这里添加复制失败的回调
        }
      );
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.$copyToClipboard);
  },
  // 当传进来的值更新的时候触发
  updated(el: any, { value }: any) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el: any) {
    el.removeEventListener('click', el.copyToClipboard)
  }
}

export default copy
