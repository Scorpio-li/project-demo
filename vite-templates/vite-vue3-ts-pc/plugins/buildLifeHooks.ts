/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-09-13 15:11:48
 * @LastEditTime: 2024-09-13 16:22:36
 * @LastEditors: lizhiliang
 * @Usage: 在打包/构建时动态写入版本号
 */
import fs from 'fs';
import path from 'path';

// 在Vite配置中添加一个插件，监听build事件
export function buildLifeHook() {
  return {
    name: 'build-life-hook',
    buildStart(){
      let now = new Date().toLocaleString().replace(/\//g,'-')
      let version = {
        version:now,
      }
      let versionPath = path.join(__dirname,'../public/version/versionData.json');
      fs.writeFile(versionPath,JSON.stringify(version),'utf8',(err)=>{
        if(err){
          console.log('写入文件失败', err);
        }else{
          console.log('写入文件成功');
        }
      })
      console.log('构建开始！' + now);
    },
    buildEnd() {
      let now = new Date().toLocaleString().replace(/\//g,'-')
      console.log('构建完成！' + now);
    },
  };
}
