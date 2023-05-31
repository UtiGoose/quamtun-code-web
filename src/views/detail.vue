<template>
    <el-dialog v-model="dialogVisible" title="选择窗口" width="20%">
        <el-form label-width="120px">
            <!-- <el-form-item label="节点数">
                <el-input-number :min="3" :max="7" v-model="nodeSum" />
            </el-form-item> -->
            <el-form-item :label="option.optionName" v-for="(option, index) in data.options">
                <el-select style="width: 50%;" v-model="option.res">
                    <el-option :label="item" :value="item" v-for="(item, i) in option.options" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="_compute">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <Header></Header>

    <div class="main" v-loading="pageLoading">
        <div class="cls"><span style="cursor:pointer;" @click="pushTo('list')"><el-icon
                    style="position: relative; top: 4px">
                    <ArrowLeft />
                </el-icon>graph</span> | 图染色 | {{ pageNo == 0 ? '第一页' : '第二页' }}</div>
        <div class="title">
            {{ data.labelTitle }}
        </div>
        <div class="publish">
            <div>
                <el-avatar :size="50" :src="'http://1.15.138.41:8080/static/image/' + data.avatar" />
            </div>
            <div class="name">{{ data.username }}</div>
            <div class="time">
                <el-icon style="position: relative; top: 2px;">
                    <Clock />
                </el-icon>
                {{ data.createTime }}
            </div>
        </div>
        <div v-if="pageNo == 0" class="box">
            <div class="info-title" id="scroll1" name="scrollItem">问题介绍</div>
            <div class="info-text">
                <div class="line" style="height: 200px;"></div>
                <div class="label">
                    <div style="color: #000;">
                        <span style="font-weight: bold;">问题描述：</span>
                        {{ data.labelQuestion }}
                    </div>
                    <div style="margin-top: 20px;">
                        <div style="color: #000;">
                            <span style="font-weight: bold;">实验任务：</span>
                            {{ data.labelTask }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="info-title" id="scroll2" name="scrollItem">算法介绍</div>
            <div class="img-box">
                <img :src="'http://1.15.138.41:8080/static/image/' + data.imageFirst" alt="">
            </div>

            <div class="info-text">
                <div class="line"></div>
                <div class="label">
                    {{ data.labelFirst }}
                    <div>
                        <el-button type="primary" @click="changePage(1)"
                            style="width: 200px; height: 50px; font-size: large; font-weight: bold; margin-top: 50px;">下一步</el-button>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="pageNo == 1">
            <div class="info-title" id="scroll3" name="scrollItem">量子计算编程设计</div>
            <div class="img-box">
                <img :src="'http://1.15.138.41:8080/static/image/' + data.imageSecond" alt="">
            </div>

            <div class="info-text">
                <div class="line"></div>
                <div class="label">
                    {{ data.labelSecond }}
                    <div>
                        <el-button type="primary" @click="dialogVisible = true"
                            style="width: 200px; height: 50px; font-size: large; font-weight: bold; margin-top: 50px;">可视化展示</el-button>
                    </div>
                </div>
            </div>
            <div class="data" v-loading="dataLoading">
                <div v-if="dataImg != ''">
                    <!-- <div class="data-title">结果:</div>
                <div class="data-text">{{ dataText }}</div> -->
                    <div class="data-title">量子线路可视化:</div>
                    <img :src="dataImg" alt="" class="data-img">
                    <div class="data-title">分解量子线路可视化（建议保存至本地查看）:</div>
                    <img :src="dataImgF" alt="" class="data-img" v-if="isShowImg">
                    <div v-else style="color: gray">图片过大，无法展示</div>
                    <div class="data-title">结果展示（仅展示最简单环路）:</div>
                    <img :src="dataImgR" alt="" class="data-img" style="width: 40%">
                </div>

            </div>
        </div>

        <div v-if="pageNo == 2">
            <div class="info-title" id="scroll3" name="scrollItem">量子计算编程设计</div>
            <div class="img-box">
                <img :src="'http://1.15.138.41:8080/static/image/' + data.imageSecond" alt="">
            </div>

            <div class="info-text">
                <div class="line"></div>
                <div class="label">
                    {{ data.labelSecond }}
                    <div>
                        <el-button type="primary" @click="dialogVisible = true"
                            style="width: 200px; height: 50px; font-size: large; font-weight: bold; margin-top: 50px;">可视化展示</el-button>
                    </div>
                </div>
            </div>
            <div class="data" v-loading="dataLoading">
                <div v-if="dataImg != ''">
                    <!-- <div class="data-title">结果:</div>
                <div class="data-text">{{ dataText }}</div> -->
                    <div class="data-title">量子线路可视化:</div>
                    <img :src="dataImg" alt="" class="data-img">
                    <div class="data-title">分解量子线路可视化（建议保存至本地查看）:</div>
                    <img :src="dataImgF" alt="" class="data-img" v-if="isShowImg">
                    <div v-else style="color: gray">图片过大，无法展示</div>
                    <div class="data-title">结果展示（仅展示最简单环路）:</div>
                    <img :src="dataImgR" alt="" class="data-img" style="width: 40%">
                </div>

            </div>
        </div>

        <!-- <el-divider><el-button type="primary" @click="dialogVisible = true">尝试一下</el-button></el-divider> -->

        <div>
            <el-icon @click="_addCollection" style="margin-top: 3px; color: #DC143C; font-size: 20px; cursor: pointer;">
                <StarFilled />
            </el-icon><span @click="_addCollection"
                style=" font-size: 14px; position: relative; bottom: 3px; cursor: pointer;">收藏</span>
        </div>
        <div class="view">

            <el-icon style="margin-top: 3px;">
                <View />
            </el-icon>
            <div>{{ data.views }}</div>
        </div>
    </div>
    <div class="scroll-box-left">
        <div class="scroll-item" @click="changePage(-1)">
            <el-icon style="font-size:large;position:relative;top:4px">
                <ArrowLeftBold />
            </el-icon>
        </div>
    </div>

    <div class="scroll-box">
        <div class="scroll-item" @click="changePage(1)">
            <el-icon style="font-size:large;position:relative;top:4px">
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ava from '../static/image/ava.jpg'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
import { compute, getOne, addCollection } from '../api/liangzi'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
var dialogVisible = ref(false)
var isH = ref('N')
var nodeSum = ref(3)
var dataLoading = ref(false)
var dataImg = ref('')
var dataImgF = ref('')
var dataImgR = ref('')
var isShowImg = ref(true)
var dataText = ref('')
var programId = ref(0)
var data = ref({})
var options = ref([])
var pageNo = ref(0)
var pageLoading = ref(false)
var detData = [{
    url1: '../static/det/3.png',
    url2: '../static/det/3h.png',
    text: '不能完成染色'
}, {
    url1: '../static/det/4.png',
    url2: '../static/det/4h.png',
    text: '不能完成染色'
}, {
    url1: '../static/det/3.png',
    url2: '../static/det/3h.png',
    text: '不能完成染色'
}]

onMounted(() => {
    const route = useRoute()
    // 打印
    programId.value = route.query.id
    _getOne(route.query.id)
})

function pushTo(url) {
    router.push(`/${url}`)
}
function changePage(index) {
    let i = pageNo.value
    i += (2 + index)
    i %= 2
    pageLoading.value = true
    setTimeout(() => {
        pageNo.value = i
        pageLoading.value = false
        backtop()
    }, 300)

}
function _getOne(id) {
    console.log(window.localStorage.getItem('token'))
    const params = {
        id: id,
        token: window.localStorage.getItem('token')
    }
    getOne(params).then(res => {
        console.log(res)
        data.value = res.data
        data.value.createTime = res.data.createTime.slice(0, 10)
        for (let i = 0; i < data.value.options.length; i++) {
            data.value.options[i].options = data.value.options[i].optionOptions.split(';')
            data.value.options[i].res = data.value.options[i].options[0]

        }
        console.log(data.value.options[0])
    })
}

function _addCollection() {
    const params = {
        token: window.localStorage.getItem('token'),
        programId: programId.value
    }
    addCollection(params).then(res => {
        console.log(res)
        ElMessage.success(res.message)
    })
}

function _compute() {
    dataLoading.value = true
    dialogVisible.value = false
    const params = {
        name: data.value.pyName
    }
    for (let i = 0; i < data.value.options.length; i++) {
        params[data.value.options[i].optionText] = data.value.options[i].res
    }
    // compute(params).then(res => {
    //     console.log(res)
    //     dataImg.value = 'http://1.15.138.41:8080/static/image/' + res[0]
    //     dataText.value = res[1]
    //     dataLoading.value = false
    // })
    setTimeout(() => {
        dataLoading.value = false
        dataText.value = '不能完成染色。'
        dataImg.value = `http://1.15.138.41:8080/static/image/${params.nodeSum}${params.isH === '否' ? '' : 'h'}.png`
        dataImgF.value = `http://1.15.138.41:8080/static/image/${params.nodeSum}f.png`
        dataImgR.value = `http://1.15.138.41:8080/static/image/${params.nodeSum}r.png`
        if (params.nodeSum == 7) {
            isShowImg.value = false
        } else {
            isShowImg.value = true
        }
    }, 2000)
}

function scrollTo(index) {
    let jumpitem = document.getElementsByName("scrollItem") //得到所有的title，包括游戏，音乐，番剧这些
    jumpitem[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
function backtop() {
    var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
            clearInterval(timer);
        }
    }, 10)
}
</script>

<style lang="scss" scoped>
.main {
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 4%;

    .cls {
        color: #757373
    }

    .box {
        min-height: 800px;
    }

    .data {
        margin: 50px 0 50px 0;
        min-height: 800px;
        width: 100%;
        background-color: #f7f7f7;
        padding: 10px 10px 100px 20px;
        line-height: 40px;
        border: 0.5px solid #757373;
        border-radius: 10px;

        .data-title {
            font-weight: bold;
            font-size: 16px;
        }

        .data-img {
            width: 90%;
            height: 90%;
            margin: 0 auto;
            object-fit: cover;
        }

        .data-text {
            color: #757373;
            font-size: 16px;
        }
    }

    .title {
        width: auto;
        text-align: center;
        font-size: 36px;
        Letter-spacing: 3px;
        line-height: 46px;
        margin: 0 auto 50px;
    }

    .publish {
        display: flex;
        margin-bottom: 20px;

        .name {
            color: #757373;
            font-size: 16px;
            line-height: 50px;
            margin-left: 10px;
        }

        .time {
            color: #757373;
            font-size: 16px;
            line-height: 50px;
            justify-content: flex-end;
            margin-left: auto;
        }
    }


    .info-title {

        font-size: 20px;
        line-height: 46px;
        font-weight: bold;

    }

    .img-box {
        width: 100%;
        height: 700px;
        margin: 20px auto;
        border: 2px solid #757373;
        margin-bottom: 30px;
        border-radius: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            // object-fit: cover;
        }
    }

    .info-text {

        display: flex;

        .line {
            height: 300px;
            width: 2px;
            background-color: #dad7d7;
            margin-bottom: 50px;
            margin-right: 30px;
        }

        .label {
            color: #424141;
            font-size: 18px;
            line-height: 40px;
            font-weight: 200;
            Letter-spacing: 3px;
            width: 95%;
            margin: 20px auto;
        }
    }
}

.view {
    float: right;
    text-align: right;
    display: flex;
}

.scroll-box {
    position: fixed;
    bottom: 45%;
    right: 20px;

    .scroll-item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
        background-color: #628bf1;
        line-height: 50px;
        color: #F7F7F7;
        text-align: center;
        cursor: pointer;
        box-shadow: 3px 3px 3px gray;
    }
}

.scroll-box-left {
    position: fixed;
    bottom: 45%;
    left: 20px;

    .scroll-item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
        background-color: #628bf1;
        line-height: 50px;
        color: #F7F7F7;
        text-align: center;
        cursor: pointer;
        box-shadow: 3px 3px 3px gray;
    }
}</style>