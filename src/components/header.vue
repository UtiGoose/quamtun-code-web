<template>
    <!-- <div class="space"></div> -->
    <div class="header">
        <img src="../static/image/logo.png" alt="" class="logo" @click="pushTo('')">
        <div class="header-title" @click="pushTo('')">QuantumCode</div>
        <input placeholder="Please input" class="search" v-model="query" @keyup.enter="select"/>
        <img src="../static/image/search-icon.png" alt="" class="search-icon" @click="select">
        <div class="header-item">
            <p @click="pushTo('list')">Programs<el-icon style="position: relative; top: 3px;">
                    <ArrowDownBold />
                </el-icon></p>
            <p @click="pushTo('introduce')">About<el-icon style="position: relative; top: 3px;">
                    <ArrowDownBold />
                </el-icon></p>
            <p @click="pushTo('mine')">User<el-icon style="position: relative; top: 3px;">
                    <ArrowDownBold />
                </el-icon></p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'

const router = useRouter()
var query = ref('')

defineComponent({
    name: 'Header'
})

function select() {
    router.push(`/list?query=${query.value}`)
}

function pushTo(url) {
    router.push(`/${url}`)
}

</script>

<style lang="scss" scoped>
.space {
    height: 20px;
}

.header {
    display: flex;
    background-color: #628bf1;
    width: 100%;
    margin: 0 auto;
    height: 80px;
    box-shadow: 2px 2px 2px 2px gray;

    .logo {
        padding-left: 7%;
        padding-top: 17px;
        height: 40px;
        cursor: pointer;
        margin-right: 5px;
    }

    .search {
        width: 25%;
        padding-left: 30px;
        padding-right: 30px;
        height: 40px;
        border: 2px solid gray; //去掉input边框
        font-size: 14px;
        outline: none;
        background-color: rgba(32, 74, 102, 0);
        color: gray;
        font-size: 16px;
        border-radius: 12px;
        margin: 20px 0 0 30px;
        background-color: #f7f7f7;

    }

    .search-icon {
        margin-right: 150px;
        width: 25px;
        height: 25px;
        margin-top: 30px;
        position: relative;
        right: 35px;
        cursor: pointer;
    }

    .header-title {
        cursor: pointer;
        font-weight: bold;
        font-size: 34px;
        line-height: 80px;
        margin-right: 12%;
        color: aliceblue;
    }

    .header-item {
        display: flex;
        width: 30%;

        p {
            margin-right: 10%;
            font-size: 20px;
            // text-decoration: underline;
            line-height: 46px;
            cursor: pointer;
            color: aliceblue;
        }
        p:hover {
        text-decoration: underline;
    }

    // p:hover::after {
    //     border-bottom-color: #000;
    //     border-left-color: #000;
    //     transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
    // }

    }

    // .header-item:hover::before,
    // .header-item:hover::after {
    //     width: 100%;
    //     height: 100%;
    // }



}</style>