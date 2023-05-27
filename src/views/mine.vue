<template>
    <div class="wrapper"
        style="background-image: linear-gradient(to bottom right, #D5EEFF, #F4FBFF, #D5EEFF); height: 100%;">

        <el-dialog v-model="editInfoVis" title="Tips" width="30%" :before-close="handleClose">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <div class="header-space"></div>
        <div class="box">
            <div class="box-header-space">
                <el-link type="info" class="back" @click="back"><el-icon>
                        <ArrowLeft />
                    </el-icon>back</el-link>
            </div>
            <div class="box-box">
                <div class="box-box-user">
                    <img :src="'http://1.15.138.41:8080/static/image/' + userData.avatar" alt="" class="ava-img">
                    <div class="item-title">Age</div>
                    <div class="item-lable">{{ userData.age }}</div>
                    <div class="item-title">Education</div>
                    <div class="item-lable">{{ userData.education }}</div>
                    <div class="item-title">Info</div>
                    <div class="item-lable">“{{ userData.description }}” </div>
                    <el-link type="primary" style="margin-left: 40%; margin-top: 40%;"
                        @click="editInfoVis = true">edit</el-link>
                </div>
                <div class="box-box-info">
                    <div class="collection">
                        <div class="title">collection</div>
                        <el-table :data="collectionList" stripe
                            style="width: 90%; margin-top: 50px; margin-left: 20px; min-height: 50%;">
                            <el-table-column prop="date" label="Date" width="200" />
                            <el-table-column prop="name" label="Name" width="200" />
                            <el-table-column prop="ip" label="ip" width="200" />
                            <el-table-column fixed="right" label="Operations">
                                <template #default="scope">
                                    <el-popconfirm title="Are you sure to delete this?" @Confirm="_delCollection(scope.row.id)">
                                        <template #reference>
                                            <el-button link type="primary" size="small">
                                                Remove
                                            </el-button>
                                        </template>
                                    </el-popconfirm>

                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination layout="prev, pager, next" :total="1" style="width: 30%; margin: 0 auto" />
                    </div>
                    <div class="history">
                        <div class="title">history</div>
                        <el-table :data="viewList" stripe
                            style="width: 90%; margin-top: 50px; margin-left: 20px; min-height: 50%;" >
                            <el-table-column prop="date" label="Date" width="200" />
                            <el-table-column prop="name" label="Name" width="200" />
                            <el-table-column prop="ip" label="ip" width="200" />
                            <el-table-column fixed="right" label="Operations">
                                <template #default="scope">
                                    <el-popconfirm title="Are you sure to delete this?" @Confirm="_delView(scope.row.id)">
                                        <template #reference>
                                            <el-button link type="primary" size="small">
                                                Remove
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination layout="prev, pager, next" :total="1" style="width: 30%; margin: 0 auto" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getCollectionList, getViewList, delCollection, delView } from '../api/liangzi'
import { getUserInfo } from '../api/user'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

onMounted(() => {
    _getCollectionList()
    _getViewList()
    _getUserInfo()
})

function _delCollection(id) {
    delCollection({id: id}).then(res => {
        ElMessage.success('删除成功')
        _getCollectionList()
    })
}

function _delView() {
    delView({id: id}).then(res => {
        ElMessage.success('删除成功')
        _getViewList()
    })
}

function _getCollectionList() {
    const params = {
        token: window.localStorage.getItem('token')
    }
    getCollectionList(params).then(res => {
        console.log(res)
        collectionList.value = res.data
    })
}
function _getViewList() {
    const params = {
        token: window.localStorage.getItem('token')
    }
    getViewList(params).then(res => {
        console.log(res)
        viewList.value = res.data
    })
}
function _getUserInfo() {
    const params = {
        token: window.localStorage.getItem('token')
    }
    getUserInfo(params).then(res => {
        console.log(res)
        userData.value = res.data
    })
}
function back() {
    router.go(-1)
}

var collectionList = ref([])
var viewList = ref([])
var userData = ref([])
var editInfoVis = ref(false)
const tableData = [
    {
        date: '2023-3-23',
        name: '图的二着色问题',
        ip: '127.0.0.1'
    }
]
</script>

<style lang="scss" scoped>
.header-space {
    height: 50px;
}

.box-header-space {
    height: 70px;
}

.box {
    width: 80%;
    height: 95%;
    border-radius: 40.8px;
    background: #FFFFFF;
    margin: 0 auto;
    box-shadow: 3px 3px 3px gray;

    .back {
        font-size: large;
        margin-top: 20px;
        margin-left: 50px;
    }
}

.box-box {
    width: 80%;
    height: 90%;
    border-radius: 60px;
    background: #FFFFFF;
    margin: auto auto;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    display: flex;

    .box-box-user {
        width: 25%;
        height: 80%;
        padding: 32px;
        border-radius: 60px;
        background: #FFFFFF;
        box-shadow: 20px 0px 200px 0px rgba(2, 13, 31, 0.04);

        .ava-img {
            width: 100%;
            border-radius: 16px;
            opacity: 1;
            align-self: stretch;
            background: linear-gradient(135deg, #0543FF -1%, #FF008A 100%), url(Image.png);
            background-blend-mode: screen, normal;
            margin-bottom: 30px;
        }

        .item-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .item-lable {
            color: #757373;
            margin-bottom: 25px;
        }
    }

    .box-box-info {
        width: 90%;

        .collection {
            height: 50%;

            .title {
                margin-top: 20px;
                margin-left: 20px;
                color: #757373;
                font-size: large;
            }

        }

        .history {
            height: 50%;

            .title {
                margin-top: 20px;
                margin-left: 20px;
                color: #757373;
                font-size: large;
            }
        }
    }
}
</style>