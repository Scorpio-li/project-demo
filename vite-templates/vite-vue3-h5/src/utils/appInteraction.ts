/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-05-14 15:37:35
 * @LastEditTime: 2024-07-05 17:25:37
 * @LastEditors: lizhiliang
 * @Usage: 
 */

// 与app进行交互的方法

/**
 * @description: 获取当前客户端机型
 * @param {} 
 * @return {String} android or ios
 */
const checkDevice = () => {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
	console.log(isiOS,isAndroid)
    if(isAndroid) {
        return 'android'
    } else if(isiOS) {
        return 'ios'
    }
}

// android事件监听
const androidEventMonitor = (appName: any, method: any, params = null) => {
    const app: any = window
    if (app[appName] && app[appName][method]) {
        let data = params ? app[appName][method](params) : app[appName][method]()
        return data || null
    }
    return null
}

// ios事件监听
function iosEventMonitor(parseObj: { method: string, params: any }) {
    let data: any;
    if (parseObj.method) {
        data = prompt(JSON.stringify(parseObj))
    }
    return data || null
}

export default {
    callHandler(appName: any, method: any, params: any) {
        const deviceType = checkDevice()
        if (deviceType === 'android') {
            const data = androidEventMonitor(appName, method, params)
            return data || null
        } else if (deviceType === 'ios') {
            const data = iosEventMonitor({
                method,
                params
            })
            return data || null
        }
    },
    checkDevice
}