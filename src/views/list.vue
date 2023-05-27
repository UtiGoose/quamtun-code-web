<template>
    <div class="wrapper">
        <Header></Header>
        <div class="main">
            <div class="left-box" v-if="data.length == 0"></div> 
            <div class="left-box" v-for="(item, i) in data">

                <div style="min-height: 80%;">
        
                    <div class="list-box" @click="pushTo('detail', item.id)">
                    <img :src="'http://1.15.138.41:8080/static/image/' + item.imageCover" alt="" class="item-img">
                    <div class="list-text">
                        <div class="list-title">{{ item.labelTitle }}</div>
                        <div class="list-label">{{ item.labelQuestion }}</div>
                        <div class="list-info">
                            <div class="list-time">时间：{{ item.createTime }}</div>
                            <el-icon style="margin-top: 3px;">
                                <View />
                            </el-icon>
                            <div class="list-count">{{ item.views }}</div>
                        </div>

                    </div>
                    
                </div>
                </div>
                
                <el-pagination background layout="prev, pager, next" @current-change="_getPage" :current-page="page.current"
            :page-size="page.size" :total="page.total" style="margin: 50px; margin-left: 30%;" />
            </div>

            <div class="line"></div>
            <div class="right">
                <div class="right-box">
                    <div class="right-box-text">graph</div>
                    <div class="right-box-count">1</div>
                </div>
                <div class="right-box">
                    <div class="right-box-text">tree</div>
                    <div class="right-box-count">0</div>
                </div>
                <div class="right-box">
                    <div class="right-box-text">DFS</div>
                    <div class="right-box-count">0</div>
                </div>
                <div class="right-box">
                    <div class="right-box-text">BFS</div>
                    <div class="right-box-count">0</div>
                </div>
                <div class="right-box">
                    <div class="right-box-text">knapsack</div>
                    <div class="right-box-count">0</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import { useRouter } from 'vue-router'
import { getPage } from '../api/liangzi'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


let page = ref({
    current: 1,
    size: 4,
    total: 0
})
let data = ref({})

const router = useRouter()

var query = ref('')

onMounted(() => {
    const route = useRoute()
    query.value = route.query.query
    if (route.query.query == null) {
        _getPage('')
    } else {
        _getPage(route.query.query)
    }
    
})

function pushTo(url, id) {
    router.push(`/${url}?id=${id}`)
}
function _getPage(query) {
    const params = {
        current: page.value.current,
        name: query
    }
    getPage(params).then(res => {
        data.value = res.data.records
        console.log(res)
        for (let i = 0;i < data.value.length; i++) {
            data.value[i].createTime = data.value[i].createTime.slice(0, 10)
        }
    })
}

</script>

<style lang="scss" scoped>
.main {
    padding-left: 12%;
    padding-right: 12%;
    padding-top: 20px;
    display: flex;
    min-height: 800px;

}

.left-box {
    width: 60%;
    min-height: 1000px;
}

.list-box {
    width: 100%;
    height: 186px;
    border: 2px solid #e7e6e6;
    border-radius: 5px;
    display: flex;
    margin-top: 50px;

    .item-img {
        width: 45%;
        height: 100%;
        object-fit: cover;
    }
}

.list-box:hover,
.list-box:focus,
.list-box:active {
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.1);
    transform: scale(1.03);
}


.list-text {
    margin: 20px 50px 50px 50px;

    .list-title {
        font-weight: bold;
        font-size: 26px;
        margin-bottom: 10px;
    }

    .list-label {
        color: #757373;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
    }

    .list-info {
        display: flex;
    }

    .list-time {
        color: #a5a1a1;
        font-size: 14px;
        margin-right: 50px;
    }

    .list-count {
        font-size: 14px;
    }


}

.line {
    content: "";
    width: 2px;
    height: 80%;
    position: absolute;
    top: 18%;
    left: 60%;
    margin: auto;
    background: #F0F0F0;
}

.right {
    margin-top: 100px;

    .right-box {
        width: 400px;
        height: 50px;
        border: 1px solid #e7e6e6;
        display: flex;
        margin-left: 200px;
    }

    .right-box-text {
        line-height: 50px;
        font-size: 16px;
        margin-left: 10px;
        color: #757373;
    }

    .right-box-count {
        margin-left: auto;
        justify-content: flex-end;
        line-height: 50px;
        font-size: 16px;
        color: #757373;
        margin-right: 10px;
    }
}
</style>