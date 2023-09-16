import './assets/main.css'
import 'w3-css/w3.css';

import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(Layui).mount('#app')
