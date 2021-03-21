<template>
    <div id="app"  v-loading="loading">
        <el-container>
            <el-header>朋友圈转发截图生成工具</el-header>
        </el-container>
        <finally-img
            :headImgUrl = 'headImgUrl'
            :userName = 'userName'
            :textarea = 'textarea'
            :fileList = 'fileList'
            :goodNumber = 'goodNumber'
            :input = 'input'
            :pointNameChoose = 'pointNameChoose'
        ></finally-img>
        <div class="main">
            <!-- 用户名与头像 -->
            <input-user
                @reciveUserImg="reciveUserImg"
            ></input-user>
            <div class="type">
                <el-radio v-model="type" label="img">图片</el-radio>
                <!-- <el-radio v-model="type" label="pic">分享网页</el-radio> -->
            </div>
            <!-- 图片添加 -->
            <nine-img
                @reciveNineImg = "reciveNineImg"
            ></nine-img>

            <div class="sharePic" v-show="type == 'pic'">啥都没做</div>
            <div class="sendTime inputUser">
                <span>发表时间：</span>
                <div class="input">
                    <el-input
                        v-model="input"
                        size="mini"
                        placeholder="10分钟前/2小时前/昨天/3天前"
                    >
                    </el-input>
                </div>
            </div>
            <div class="dianzan inputUser">
                <span>点赞数:</span>
                <div class="input">
                    <el-input
                        v-model="goodNumber"
                        size="mini"
                        placeholder="请输入数字"
                    >
                    </el-input>
                </div>
            </div>
            <div class="dianzan inputUser">
                <span>点赞备注:</span>
                <div class="input">
                    <el-input
                        v-model="pointNameChoose"
                        size="mini"
                        placeholder="如：腾飞，王者"
                    >
                    </el-input>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import inputUser from "./views/header";
import finallyImg from "./views/finallyImg";
import nineImg from "./views/nineImg";
import html2canvas from "html2canvas";


export default {
    name: "app",
    data() {
        return {
            userName:'',                //用户名
            headImgUrl:'',              //头像图片

            coverImgUrl:'',                //封面图片
            textarea: "我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了我知道了",                 //正文
            fileList:[],
            loaclTime:'9:00',
            input: "",            //发表时间
            imageUrl: "",                
            goodNumber:"1",               //点赞数
            pointNameChoose:'',                //点赞名字
            
            type: "img",
            htmlUrl:''
        };
    },
    methods: {
        //接受头像和名字的上传
        reciveUserImg(imgUrl,name,textarea){
            this.headImgUrl = imgUrl
            this.userName = name
            this.textarea = textarea
        },
        //接受9图片
        reciveNineImg(fileList){
            this.fileList = fileList
        },
    },
    components: {
        inputUser,
        finallyImg,
        nineImg,
    },
};
</script>

<style lang='less'>
* {
    margin: 0px;
    padding: 0px;
}
.el-header {
    background-color: skyblue;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.main {
    margin: 0 auto;
    background-color: #e9eef3;
    color: #333;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
}

.avatar-uploader {
    height: 40px;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 35px;
    height: 35px;
    line-height: 58px;
    text-align: center;
}
.avatar {
    width: 40px;
    height: 40px;
    display: block;
}
.el-message-box{
    // vertical-align:top !important;
    text-align: left;
    display: block !important;
}
</style>
