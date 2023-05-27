<template>
    <div class="footer">
        <div class="footer-use">
            <div class="footer-text">Copyright © 2023 ntu</div>
            <div class="footer-us">
                <!-- <el-link style="color: gray; font-weight: 100; font-size: 14px;"><el-icon><Link />
                </el-icon>&nbsp;share</el-link>
                <el-link style="margin-left: 100px; color: gray; font-weight: 100; font-size: 14px;"><el-icon> <ChatLineRound /></el-icon>&nbsp;join us</el-link> -->
                <img src="../static/image/logo.png" alt="" class="footer-logo"><span style="color: #000; font-weight: bold;">&nbsp;QuantumCode</span>
                <div>Email：1369362184@qq.com</div>
                <div>phone：13063583283</div>
            </div>
            <div class="footer-btn">
                <div>
                    <el-link style="color: gray; font-weight: 100; font-size: 14px;"><el-icon><Link />
                </el-icon>&nbsp;share</el-link>
                </div>
                <div>
                    <el-link style="color: gray; font-weight: 100; font-size: 14px;"><el-icon> <ChatLineRound /></el-icon>&nbsp;join us</el-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

const router = useRouter()

defineComponent({
    name: 'Footer'
})

function pushTo(url) {
    router.push(`/${url}`)
}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    height: 120px;
    background-color: #f3f3f3;
    margin-top: 100px;

    .footer-use {
        display: flex;

        .footer-text {
            font-size: 14px;
            color: gray;
            line-height: 120px;
            font-weight: 100;
            margin-left: 100px;
        }

        .footer-us {
            margin-left: 32%;
            font-size: 14px;
            color: gray;
            line-height: 35px;
            font-weight: 100;
        }
        .footer-btn {
            justify-content: flex-end;
            margin-left: auto;
            margin-right: 200px;
            font-size: 14px;
            color: gray;
            margin-top: 40px;
            line-height: 30px;
            font-weight: 100;
        }
        .footer-logo {
            width: 25px;
            position: relative;
            top: 5px;
        }
    }

}</style>