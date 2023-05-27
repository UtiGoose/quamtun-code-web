<template>
    <div class="login-wrapper" v-if="isLogin">
        <div class="header">Login</div>
        <div class="form-wrapper">
            <input type="text" name="username" placeholder="username" class="input-item" v-model="loginData.username">
            <input type="password" name="password" placeholder="password" class="input-item" v-model="loginData.password">
            <div class="btn" @click="_login">Login</div>
        </div>
        <div class="msg">
            Don't have account?
            <a href="#" @click="toReg">Sign up</a>
        </div>
    </div>
    <div class="login-wrapper" v-if="isReg">
        <div class="header">Register</div>
        <div class="form-wrapper">
            <input type="text" name="username" placeholder="username" class="input-item" v-model="registerData.username">
            <input type="password" name="password" placeholder="password" class="input-item" v-model="registerData.password">
            <input type="password" name="password" placeholder="confirm password" class="input-item" v-model="registerData.confirmPassword">
            <div class="btn" @click="_register">Register</div>
        </div>
        <div class="msg">
            Has a account?
            <a href="#" @click="toLogin">Login</a>
        </div>
    </div>
    <div class="wrapper" style="background-image: linear-gradient(to top right, #D5EEFF, #F4FBFF, #D5EEFF); height: 100%;"
        :style="isLogin||isReg ? 'pointer-events: none; opacity:0.3; filter: alpha(opacity=60);' : ''">

        <Header></Header>
    
        <div class="main">
            <img src="../static/image/bg.png" alt="" style="width: 100%; object-fit: cover; height: 400px;">




            <div class="show">
                <div class="show-item">
                    <div class="show-title">
                        Quantum code <br> to learn quantum programming
                    </div>
                    <div class="show-text">
                        Quantum programming changes the way you think about programming.
                    </div>
                </div>
                <el-button type="primary" @click="pushTo('list')"
                    style="height: 60px; width: 200px; margin-top: 100px; margin-left: 30%; font-size: 20px; font-weight: bold;">Try Now</el-button>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { login, register } from '../api/user'
import { ElMessage } from 'element-plus'

let isLogin = ref(false)
let isReg = ref(false)
let registerData = ref({
    username: null,
    password: null,
    confirmPassword: null
})
let loginData = ref({
    username: null,
    password: null
})

onMounted(() => {
    const { appContext: { config: { globalProperties } } } = getCurrentInstance()
    if (!globalProperties.$isLog) {
        toLogin()
    }
    console.log(globalProperties.$isLog)
})


const router = useRouter()
const data = [
    {
        img: 'https://pic4.zhimg.com/v2-f7280791f4b660b72350c53e37a41b4a_1200x500.jpg',
        url: 'list'
    }, {
        img: 'http://1.15.138.41:8080/static/image/item.png',
        url: 'detail'
    }, {
        img: 'http://1.15.138.41:8080/static/image/item.png',
        url: ''
    }
]

function toReg() {
    isReg.value = true
    isLogin.value = false
}
function toLogin() {
    isLogin.value = true
    isReg.value = false
}
function pushTo(url) {
    router.push(`/${url}`)
}
//method
function _login() {
    login(loginData.value).then(res => {
        if (res.code === 20007) {
            window.localStorage.setItem('token', res.data)
            console.log(window.localStorage.getItem('token'))
            isLogin.value = false
            ElMessage.success('登录成功')
        }
    })
}
function _register() {
    if (registerData.value.password !== registerData.value.confirmPassword) {
        ElMessage.error('请保证密码一致')
        return
    }
    const data = {
        username: registerData.value.username,
        password: registerData.value.password
    }
    console.log(data)
    register(data).then(res => {
        console.log(res)
        if (res.code !== 20003) {
            ElMessage.error(res.message)
        } else {
            ElMessage.success(res.message)
            registerData.value = {
                username: null,
                password: null,
                confirmPassword: null
            }
            status.value = true
        }
    })
}
</script>

<style lang="scss" scoped>
.main {
    padding-left: 12%;
    padding-right: 12%;
    padding-top: 20px;
    min-height: 500px;

    .carousel {
        margin-top: 50px;
    }
}

.show {
    margin-top: 200px;
    display: flex;

    .show-item {
        .show-title {
            line-height: 72px;
            font-weight: bold;
            font-size: 52px;
        }

        .show-text {
            line-height: 36px;
            font-size: 26px;
            margin-top: 30px;
            color: #757373;
        }
    }

    .show-img {
        margin-left: 15%;
        width: 40%;
    }

}

.login-wrapper {
    background-color: #fff;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 2px 2px gray;
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item:placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>