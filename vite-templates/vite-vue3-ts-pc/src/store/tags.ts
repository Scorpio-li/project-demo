/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-16 10:17:32
 * @LastEditTime: 2024-07-16 10:17:32
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface ListItem {
  name: string
  path: string
  title: string
}

export const useTagsStore = defineStore(
  'tags',
  () => {
    let list = ref<ListItem[]>([])

    let show = computed(() => {
      return list.value.length > 0
    })
    let nameList = computed(() => {
      return list.value.map((item: ListItem) => item.name)
    })

    function delTagsItem(index: number) {
      list.value.splice(index, 1)
    }
    function setTagsItem(data: ListItem) {
      list.value.push(data)
    }
    function clearTags() {
      list.value = []
    }
    function closeTagsOther(data: ListItem[]) {
      list.value = data
    }

    return { list, show, nameList, delTagsItem, setTagsItem, clearTags, closeTagsOther }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
