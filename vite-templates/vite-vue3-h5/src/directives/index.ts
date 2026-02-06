import copy from './copy'
import debounce from './debounce'

const directives: any = {
  copy,
  debounce
}

export default {
  install(app: any) {
    Object.keys(directives).forEach((key: string) => {
      // console.log('key', key, directives[key])
      app.directive(key, directives[key])
    })
  }
}
