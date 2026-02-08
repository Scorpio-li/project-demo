// 按需引入vant

import {
  Button,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  Icon,
  Search,
  DropdownMenu,
  DropdownItem,
  Image,
  Lazyload,
  Tabs,
  Tab,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  List,
  Loading
} from 'vant'
const pluginsVant = [
  Button,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  Icon,
  Search,
  DropdownMenu,
  DropdownItem,
  Image,
  Lazyload,
  Tabs,
  Tab,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  List,
  Loading
]
export const vantPlugins = {
  install: function (vm: any) {
    pluginsVant.forEach((item: any) => {
      vm.component(item.name, item)
    })
  }
}
