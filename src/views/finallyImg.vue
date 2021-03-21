<template>
<div style="position: relative;">
    <!-- 用户名与头像 -->
    <!-- <div class="finallyImg" ref="imageTofile" v-if="controlSHow"> -->
    <div class="finallyImg" ref="imageTofile" v-if="true">
        <img class="headerImg" src="../assets/newImg.png" alt="" />
        <img class="bottomImg" src="../assets/bottom.png" alt="" />
        <div class="localTime">{{localTime}}</div>
        <div class="zhengwen">
            <div class="left">
                <img class="userImg" :src="headImgUrl" alt="">
            </div>
            <div class="right">
                <!-- 用户名 -->
                <div class="userName">{{name}}</div>
                <!-- 正文 -->
                <div class="neirong">
                    {{textarea1}}
                </div>
                <!-- 图片 -->
                <div v-if="imgNumber == 1" class="oneImg" >
                    <img :src="fileList1[0]"  alt="" :style="oneImgClass">
                </div>
                <div v-else-if="imgNumber == 4" class="fourImg">
                    <ul>
                        <li v-for="item in fileList1" :key="item">
                            <img :src="item"  alt="" style="float:left;width:262px;height:262px">
                        </li>
                    </ul>
                </div>
                <!-- 9宫格时为825px -->
                <div v-else-if="imgNumber == 9" class="nineImg" :style="getImgHeight()">
                    <ul>
                        <li v-for="item in fileList1" :key="item">
                            <img :src="item"  alt="" style="float:left;width:262px;height:262px">
                        </li>
                    </ul>
                </div>
                <!-- 定位删除等 -->
                <div class="lateTime">
                    {{lateTime}}<span>删除</span>
                    <img src="../assets/more.png" alt="">
                </div>
                 <!-- 点赞 -->
                <div class="point">
                    <span v-for="item in goodName" :key="item">{{item}}</span>
                </div>
            </div>
        </div>
        <!-- 分割线 -->
       <div class="hengxian"></div>
       <!-- 其它朋友圈 -->
       <div class="other">
           <img :src="require('../assets/other/'+otherImgSrc+'.png')" alt="">
       </div>
    </div>
        <el-button type="text" @click="htmlToImg">生成</el-button>
</div>
</template>

<script>
import html2canvas from "html2canvas"
export default {
    name: "finallyImg",
    props :{
        headImgUrl:String,
        userName:String,
        textarea:String,
        fileList:Array,
        input:String,
        goodNumber:String,
        pointNameChoose:String,
    },
    data() {
        return {
            userImg:'xxxx',
            name:'',
            textarea1:'',
            fileList1:[],
            imgNumber:0,
            oneImgClass:'',
            lateTime:'',
            htmlUrl:'',
            gondNumber1:10,
            goodName:[],
            controlSHow:false,
            pointHeader:'♡ ',
            pointNameMid:'',
            pointName:[' 袁杰总工,',' 钱卫平,',' 鱼松项目徐晨,',' 人间龙,',' 眼界,',' 苏红年,',' 嫂子,',' 冯志强,',' 好夫君老师,',' 沥青,',' 才哥,',' 刘璇问,',' 四亿,','记者端安电视台,','代理与陈,','王伟（实验）']
        };
    },
    methods:{
        //获取图片高度
        getImgHeight(){
            let num = this.fileList1.length;
            if(num == 2 || num == 3){
                return "height:310px"
            }else if(num == 5 || num == 6){
                return "height:530px"
            }else{
                return "height:825px"
            }
        },
        changeGoodNumber(){
            debugger
            this.goodName = this.pointName.slice(0,this.gondNumber1)
            this.goodName.unshift(this.pointNameMid)
            this.goodName.unshift(this.pointHeader)
        },
        dealImgList(){
            if(this.imgNumber == 1){
                let img = new Image()
                img.src = this.fileList1[0]
                let width = parseInt(img.width/3.5) + 'px'
                let height = parseInt(img.height/3.5) + 'px'
                this.oneImgClass = `width:${width};height:${height}`
            }
        },
        htmlToImg() {
            this.controlSHow = true
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                let finallyImg = document.querySelector('.finallyImg');//如果box设置了padding，需要获取outerWidth和outerHeight来赋给canvas；
                window.pageYoffset = 0;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                let that = this
                html2canvas(this.$refs.imageTofile, {
                    allowTaint:true,
                    backgroundColor: null,
                    scale: 1,
                    height: 2244,
                    windowHeight: finallyImg.scrollHeight,
            　　　　 useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                }).then((canvas) => {
                    let url = canvas.toDataURL('image/png')
                    that.htmlUrl = url
                    if(this.headImgUrl == "" || this.userName == "" || this.input == "" ){
                        that.$message('请完善信息');
                        this.$notify({
                            title: '提示',
                            message: '请完善信息',
                            position: 'top-left'
                        });
                    }else{
                        that.open(url)
                    }
                    // 把生成的base64位图片上传到服务器,生成在线图片地址
                    that.controlSHow = false
                    loading.close();
                })
            }, 1000);


        },
        open(url) {
            this.$alert(`<img src="${url}" alt="" class='yulan'>`, '长按保存图片', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '关闭',
            }).then(() => {

            });

      }
    },
    computed:{
        localTime(){
            var myDate = new Date();
            return myDate.getHours() + ':' + myDate.getMinutes();
        },
        otherImgSrc(){
            let random = Math.ceil(Math.random()*10);
             return 'other' + random
        }
    },
    watch: {
      headImgUrl(newVal) {
        this.userImg = newVal;
      },
      userName(newVal) {
        this.name = newVal;
      },
      textarea(newVal) {
        this.textarea1 = newVal;
      },
      fileList(newVal){
        this.fileList1 = newVal;
        if(this.fileList1.length == 0){
            this.imgNumber = 0
        }else if(this.fileList1.length == 1){
            this.imgNumber = 1
        }else{
            this.imgNumber = 9
        }
        this.dealImgList()
      },
      input(newVal){
          this.lateTime = newVal
      },
      goodNumber(newVal){
          this.gondNumber1 = parseInt(newVal, 10)
          this.changeGoodNumber()
      },
      pointNameChoose(newVal){
          this.pointNameMid = newVal
          this.changeGoodNumber()
      }
    }
};
</script>

<style lang='less'>
.finallyImg {
    position: absolute;
    display: inline-block;
    left: 2000px;
    width: 1080px;
    height: 2244px;
    background-color: #fff;
    overflow: hidden;
    .headerImg {
        width: 100%;
        height: 216px;
    }
    .bottomImg {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 90px;
        z-index: 9;
    }
    .zhengwen {
        margin-top: 50px;
        .left,
        .right {
            display: block;
            float: left;
        }
        .left {
            width: 165px;
            .userImg {
                width: 112px;
                height: 112px;
                margin-left: 30px;
                border-radius: 15px;
            }
        }
        .right {
            display:block;
            width:821px;
            // height: 1500px;
            // overflow:hidden;
            .userName {
                font-size: 45px;
                letter-spacing: 5px;
                color:#4d5a87;
            }
            .neirong {
                margin-top: 10px;
                font-size: 45px;
                line-height: 53px;
            }
            .oneImg,.nineImg {
                margin-top: 35px;
            }
            .lateTime {
                position: relative;
                margin-top: 28px;
                font-size: 35px;
                color: grey;
                span {
                    margin-left: 20px;
                    color:#4d5a87;
                }
                img {
                    width: 125px;
                    position: absolute;
                    margin-top:-9px;
                    right: -72px;
                    vertical-align: middle;
                    z-index: 2;
                }
            }
            .nineImg {
                ul li{
                    float: left;
                    padding: 5px;
                    list-style: none;
                }
            }
            .point {
                display: inline-block;
                width: 880px;
                font-family:"Roboto,Noto,Helvetica,Arial";
                background-color: rgb(246, 246, 246);
                margin-top: 35px;
                margin-bottom: 40px;
                font-size: 40px;
                font-weight: 500;
                color:#4d5a87;
            }
            .fourImg {
                ul {
                    width: 500px;
                }
            }
        }
    }
    .hengxian {
        display: inline-block;
        width: 100%;
        height: 1px;
        margin-top:-15px;
        border-top: 0.5px solid rgba(246, 246, 246,.8);
    }
    .other {
        img {
            width: 100%;
        }
    }
    .localTime {
        position: absolute;
        top: 23px;
        left: 36px;
        font-size: 46px;
        font-weight: 500;
    }
}
.yulan {
    width: 270px;
    height: 400px;
}
.el-message-box {
    width: 300px !important;
}

</style>