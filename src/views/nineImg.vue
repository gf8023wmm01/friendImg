<template>
    <div class="nineImg">
        <el-upload ref="upload" action="#" list-type="picture-card" :auto-upload="false" :on-change="onchangeHead"  >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                />
                <span class="el-upload-list__item-actions">
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file,fileList)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "nineImg",
    data() {
        return {
            dialogImageUrl: "",
            imageArray:[],
            dialogVisible: false,
            disabled: false,
            fileList:[]
        };
    },
    methods: {
        handleRemove(file) {
            let index = this.$refs.upload.uploadFiles.indexOf(file)
            this.$refs.upload.uploadFiles.splice(index,1)
            this.imageArray.splice(index,1)
            this.$emit('reciveNineImg', this.imageArray)
        },
        onchangeHead(file, fileList) {
            if(this.imageArray.length < 9){
                var _this = this;
                var event = event || window.event;
                var file = event.target.files[0];
                var reader = new FileReader();
                //转base64
                reader.onload = function (e) {
                    _this.dialogImageUrl = e.target.result; //将图片路径赋值给src
                    _this.imageArray.push(e.target.result)
                    _this.$emit('reciveNineImg', _this.imageArray)
                    
                };
                reader.readAsDataURL(file);
            }else{
                this.$refs.upload.uploadFiles.splice(9,1)
                alert('照片数量不能大于9')
            }
        },
    },
};
</script>

<style  lang='less'>
.nineImg {
    .el-upload--picture-card{
        width: 80px;
        height: 80px;
        line-height: 80px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width: 80px;
        height: 80px;
    }
}
</style>