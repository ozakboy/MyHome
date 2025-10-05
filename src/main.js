import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { Icon } from '@iconify/vue'
import HugeiconsVue from '@/utils/icons/HugeiconsVue.js';

// Element Plus 圖標
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 創建應用實例
const app = createApp(App)
app.component('Icon', Icon);

// 註冊 Element Plus 圖標
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 註冊 HugeiconsVue  圖標
for (const [key, component] of Object.entries(HugeiconsVue)) {
    app.component(key, component);
}

// 使用插件
app.use(router)
app.use(ElementPlus)

// 掛載應用
app.mount('#app')