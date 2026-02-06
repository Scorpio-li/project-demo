
// 设置vconsole显示
export const vonsoleClick = {
    clickTimes: 0,
    trigger(
        clickCallback: () => any,
        maxTimes = 6,
        time = 2000
    ) {
        this.clickTimes || (this.clickTimes = 0);
        ++this.clickTimes > maxTimes && (this.clickTimes = 0);
        this.clickTimes === 1 &&
            setTimeout(() => {
                this.clickTimes === maxTimes && clickCallback()
                this.clickTimes = 0
                console.log('setTimeout')
            }, time)
    }
}
