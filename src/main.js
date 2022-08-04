import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import en from 'element-plus/es/locale/lang/en'
const app = createApp(App)

app.use(ElementPlus, { locale: en})
app.mount('#app')