<template>
    <div id="details">
        <mu-appbar class="topTitle" :title="recom.author">
            <mu-icon-button @click="handleBack" icon="reply" slot="left"></mu-icon-button>
            <mu-icon-menu icon="more_vert" slot="right">
                <mu-menu-item title="分享"></mu-menu-item>
                <mu-menu-item title="举报"></mu-menu-item>
            </mu-icon-menu>
        </mu-appbar>
        <div class="player">
            <img :src="recom.image" class="playerImg" :alt="recom.id">
        </div>
        <mu-tabs style="backgroundColor:#fff" :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="简介"></mu-tab>
            <mu-tab value="tab2" title="评论"></mu-tab>
        </mu-tabs>
        <div v-if="activeTab === 'tab1'">
            <mu-paper class="demo-paper" :zDepth="1">
                <div class="moveTitle">{{recom.moveTitle}}</div>
                <div class="introduce">播放量：{{recom.playVolume}}</div>
                <mu-divider></mu-divider>
                <div class="author">
                    <img class="photo" :src="recom.photo" alt="">
                    <div class="photoRight">
                        <p class="rightName">{{recom.author}}</p>
                        <p class="rightTime">发布于{{recom.dateTime | times}}</p>
                    </div>
                    <div @click="handleFollow" class="follow" :class="this.follow?'':'followed'">
                        {{this.follow?'关注':'已关注'}}
                    </div>
                </div>
            </mu-paper>
        </div>
        <div v-if="activeTab === 'tab2'">
            <div class="commentList">
                <div v-for="(item,index) in comment" :key="index">
                    <div class="author comment">
                        <img class="photo" :src="item.photos" alt="">
                        <div class="photoRight">
                            <div class="rightName">
                                <p class="floatLeft">{{item.name}}</p>
                                <p class="floatRight floorid">#{{item.id+1}}</p>
                            </div>
                            <p class="rightTime">发布于{{item.dateTime | times}}</p>
                            <div class="comments">{{ item.comments }}</div>
                        </div>
    
                    </div>
                    <mu-divider></mu-divider>
                </div>
            </div>
            <div class="sendInput">
                <mu-text-field v-model="comments" hintText="说点什么"></mu-text-field>
                <mu-flat-button @click="handleSend" icon="send" class="sendBtn" color="#f48fb1"></mu-flat-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { getRecommend, getComment, addComment } from '../../api/api.js'
export default {
    methods: {
        //返回上一页
        handleBack() {
            window.history.go(-1);
        },
        //切换该页导航
        handleTabChange(val) {
            this.activeTab = val
        },
        //获取对应ID的数据
        fetchData() {
            // ID的正则
            let reg = /\/Recommend\/(\d+)/;
            // 获取ID
            let id = this.$route.path.match(reg)[1];
            //console.log(this.$route.path.match(reg)[1]);
            getRecommend().then(res => {
                //console.log(res.Recommend[id])
                this.recom = res.Recommend[id];
            }).catch(err => {
                console.log(err);
            });

            //评论信息
            getComment().then(res => {
                this.comment = res.Comment.reverse();
            }).catch(err => {
                console.log(err);
            });

        },
        //改变关注状态
        handleFollow() {
            this.follow = !this.follow;
        },
        //发送评论
        handleSend() {
            //将当前时间转换为"yyyy-MM-dd hh:mm:ss"格式
            Date.prototype.Format = function (fmt) {  
                var o = {
                    "M+": this.getMonth() + 1, //月份 
                    "d+": this.getDate(), //日 
                    "h+": this.getHours(), //小时 
                    "m+": this.getMinutes(), //分 
                    "s+": this.getSeconds(), //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            //判断评论栏是否为空
            if (this.comments.length > 0) {
                //判断 是否登录
                if (sessionStorage.users) {
                    let user = JSON.parse(sessionStorage.users)
                    let ComForm = {
                        comments: this.comments,
                        avatar: user.avatar,
                        name: user.username,
                        id: user.id,
                        dateTime: new Date().Format("yyyy-MM-dd hh:mm:ss")
                    }
                    //发送
                    let para = Object.assign({}, ComForm);
                    //console.log(para)
                    addComment(para).then(res => {
                        console.log('ok')
                    });
                    this.comments = '';
                    this.fetchData();
                } else {
                    this.$router.push({ path: '/Login' });
                }
            }
            else {
                Toast({
                    message: '评论不能为空',
                    position: 'middle',
                    duration: 3000
                })
            }


        }
    },
    mounted() {
        this.fetchData();
    },
    data() {
        return {
            recom: {},
            comment: [],
            activeTab: 'tab1',
            follow: true,
            comments: ''
        }
    }
    

}
</script>

<style>
#details {
    background-color: #eee;
}


/*加上顶部 id：details 防止与首页的样式冲突*/

#details .mu-tab-text {
    color: #f48fb1;
}

#details .mu-tab-link-highlight {
    background-color: #f48fb1;
}

.topTitle {
    text-align: center;
    height: 1.3rem;
}

.mu-appbar {
    background-color: #f48fb1;
}

#details .mu-text-field {
    width: 8rem;
    margin-left: 0.8rem;
}

#details .mu-tabs {
    height: 1.3rem;
    box-shadow: 0px 5px 8px #ccc;
}

#details .mu-flat-button {
    height: 0.9rem;
    line-height: 0.9rem;
}

.demo-paper {
    display: inline-block;
    height: 100%;
    width: 9rem;
    margin: 20px;
    padding: 10px;
}

.moveTitle {
    font-size: 20px;
}
.player{
    width: 10rem;
    height: 5.4rem;
}
.introduce {
    color: #aaa;
    margin: 10px 0;
}

.photo {
    border-radius: 50%;
    float: left;
    width: 40px;
}

.author {
    margin-top: 10px;
}

.photoRight {
    float: left;
    margin-left: 10px;
}

.rightName {
    padding: 2px 0;
    font-size: 16px;
}

.rightTime {
    color: #aaa;
    clear: both;
}

.follow {
    float: right;
    line-height: 32px;
    background-color: #f48fb1;
    width: 60px;
    text-align: center;
    border-radius: 25px;
    font-size: 14px;
    color: #fff;
    margin-top: 10px;
}

.followed {
    background-color: #eee;
    color: #aaa;
}

.floatLeft {
    float: left;
}

.floatRight {
    float: right;
}

.floorid {
    font-size: 12px;
    color: #aaa;
}

.comment {
    padding-left: 15px;
}

.comments {
    word-wrap: break-word;
    width: 7rem;
    padding: 5px 0;
}

.commentList {
    height: 8.4rem;
    overflow: auto;
}

.sendInput {
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 1.3rem;
}

.mu-text-field-focus-line {
    background-color: #f48fb1;
}

.sendBtn {
    min-width: 0.9rem;
    vertical-align: middle;
}
.playerImg{
    width: 10rem;
    max-width: 10rem;
}
</style>
