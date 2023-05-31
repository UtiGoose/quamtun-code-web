<template>
    <div class="wrapper"
        style="background-image: linear-gradient(to bottom right, #D5EEFF, #F4FBFF, #D5EEFF); height: 100%;">

        <el-dialog v-model="editInfoVis" title="edit info" width="50%">
            <el-form label-position="left" label-width="100px" style="max-width: 460px">
                <el-form-item label="Avatar">
                    <img :src="'http://1.15.138.41:8080/static/image/' + editData.avatar" alt="" class="edit-ava-img">
                    <el-upload class="upload-demo" :limit="1" Content-Type="multipart/form-data" name="file"
                        action="http://1.15.138.41:9091/user/upload" :on-change="handleChange"
                        :on-success="getImgUrl">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>

                    </el-upload>
                </el-form-item>
                <el-form-item label="Age">
                    <el-input v-model="editData.age" />
                </el-form-item>
                <el-form-item label="Education">
                    <el-input v-model="editData.education" />
                </el-form-item>
                <el-form-item label="Description">
                    <el-input v-model="editData.description" />
                </el-form-item>

                <el-button @click="_updInfo">submit</el-button>
            </el-form>
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
                    <el-link type="primary" style="margin-left: 40%; margin-top: 40%;" @click="openDia">edit</el-link>
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
                                    <el-popconfirm title="Are you sure to delete this?"
                                        @Confirm="_delCollection(scope.row.id)">
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
                            style="width: 90%; margin-top: 50px; margin-left: 20px; min-height: 50%;">
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
import { getUserInfo, updInfo } from '../api/user'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()
let editData = ref({
    token: '',
    avatar: '',
    age: 0,
    education: '',
    description: ''
})
onMounted(() => {
    _getCollectionList()
    _getViewList()
    _getUserInfo()
})

let fileUpload = ref('')
// 选择文件时被调用，将他赋值给fileUpload
const handleChange = (file) => {
    fileUpload.value = file

    let fd = new FormData()
    fd.append('file', file)
    console.log(file)
    console.log(fd.get('file'))
}
function getImgUrl(response) {
    console.log("data:"+response)
    editData.value.avatar = response
}
// 确定上传
function _updInfo() {
    updInfo(editData.value).then(res => {
        console.log(res)
        ElMessage.success('修改成功')
        editInfoVis.value = false
        router.go(0)
    })
}

function openDia() {
    editInfoVis.value = true
    editData.value.token = window.localStorage.getItem('token')
    editData.value.age = userData.value.age
    editData.value.avatar = userData.value.avatar
    editData.value.education = userData.value.education
    editData.value.description = userData.value.description
}
function _delCollection(id) {
    delCollection({ id: id }).then(res => {
        ElMessage.success('删除成功')
        _getCollectionList()
    })
}

function _delView(id) {
    delView({ id: id }).then(res => {
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
.edit-ava-img {
    width: 50px;
    cursor: pointer;
}

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