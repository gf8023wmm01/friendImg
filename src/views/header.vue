<template>
    <!-- 用户名与头像 -->
    <div class="inputUser">
        <span>用户名：</span>
        <div class="input">
            <el-input
                v-model="userName"
                :change = 'nameChange()'
                size="mini"
                placeholder="请输入用户名"
            ></el-input>
        </div>
        <div class="img">
            <el-upload
                class="avatar-uploader"
                action="123"
                :show-file-list="false"
                :on-success="handleAvatarSuccessHead"
                :on-change="onchangeHead"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="headImgUrl" :src="headImgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <span class="changeImg"> 切换头像</span>
         <!-- 正文部分 -->
        <div class="content">
            <span>正文</span>
            <div class="cont">
                <el-input
                    type="textarea"
                    :rows="4"
                    :change = 'nameChange()'
                    placeholder="这一刻的想法..."
                    v-model="textarea"
                >
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'header',
    data(){
        return {
            userName:'',
            headImgUrl:'',
            textarea:'',
        }
    },
    methods: {
        nameChange(){
            this.$emit('reciveUserImg',this.headImgUrl,this.userName,this.textarea)
        },
        handleAvatarSuccessHead(res, file) {
            this.headImgUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        //当上传图片后，调用onchange方法，获取图片本地路径
        onchangeHead(file, fileList) {
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader();
            //转base64
            reader.onload = function (e) {
                _this.headImgUrl = e.target.result; //将图片路径赋值给src
                _this.$emit('reciveUserImg',e.target.result,_this.userName)
            };
            reader.readAsDataURL(file);
        },
    },
}
</script>

<style lang='less'>
.inputUser {
    margin-top: 10px;
    text-align: left;
    .img {
        margin-top: -3px;
        margin-left: 8px;
        display: inline-block;
        width: 30px;
        box-shadow: 0 0 15px grey;
        vertical-align: middle;
    }
    .input {
        display: inline-block;
        width: 150px;
        margin: 5px;
    }
    .changeImg {
        color: #ff4081;
    }
    .avatar-uploader {
         height: 30px;
    }
    .el-icon-plus:before{
        margin-left:-2px
    }
}
.avatar-uploader-icon {
    line-height: 35px !important;
}
</style>