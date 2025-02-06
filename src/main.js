import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '../src/index.css'
import './assets/base.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
