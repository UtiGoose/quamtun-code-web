import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { loginByToken } from './api/user'

const app = createApp(App).use(router).use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

app.config.globalProperties.$isLog = false

// 禁用右键
document.oncontextmenu = new Function("event.returnValue=false");
// 禁用选择
document.onselectstart = new Function("event.returnValue=false");

const whiteList = ['/']
router.beforeEach( function (to, from, next) {
    const token = window.localStorage.getItem('token')
    console.log(token)
    if (token == null) {
        app.config.globalProperties.$isLog = false
        if (to.path !== '/') {
            next('/')
        } else {
            next()
        }
        return
    }
    const data = {
        token: token
    }
    loginByToken(data).then(res => {
        console.log(res)
        if (res.code === 20007) {
            app.config.globalProperties.$isLog = true
            next()
        } else {
            
            app.config.globalProperties.$isLog = false
            if (to.path === '/') {
                next()
            } else {
                next('/')
            }
        }
    })
})