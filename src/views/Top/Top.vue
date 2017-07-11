<template>
    <div id="top">
        <mu-appbar title="Title">
            <i class="material-icons md-dark align" @click="toggle(true)">sort</i>
            <img class="userImg align" @click="toggle(true)" :src="user.useravatar" alt="">
            <i class="align nameSize" @click="toggle(true)">{{ user.username }}</i>
            <!-- 顶部右侧 -->
            <i class="material-icons md-dark align padleft" slot="right">dvr</i>
            <i class="material-icons md-dark align padleft" slot="right">games</i>
            <i class="material-icons md-dark align padleft" slot="right">file_download</i>
            <i class="material-icons md-dark align padleft" slot="right">search</i>
        </mu-appbar>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-list @itemClick="docked ? '' : toggle()">
                <div class="leftNav">
                    <img class="leftImg" @click="handleAvatar" :src="user.useravatar" alt="">
                    <div class="leftName">{{ user.leftname }}</div>
                </div>
                <mu-menu-item title="历史记录" leftIcon="remove_red_eye"></mu-menu-item>
                <mu-menu-item title="我的收藏" leftIcon="starred"></mu-menu-item>
                <mu-menu-item title="帮助中心" leftIcon="help"></mu-menu-item>
                <mu-menu-item @click="handleSettings" title="设置" leftIcon="settings"></mu-menu-item>
                <mu-list-item v-if="hasUser" @click="signOut" title="退出登录"></mu-list-item>
                <mu-list-item v-if="docked" @click.native="open = false" title="Close"></mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            open: false,
            docked: true,
            hasUser: '',
            user: {
                username: '未登录',
                useravatar: require('../../assets/0300162896ze.jpg'),
                leftname: '点击头像登录'
            }
        }
    },
    methods: {
        toggle(flag) {
            this.open = !this.open;
            this.docked = !flag
        },
        handleAvatar() {
            if (!sessionStorage.users) {
                this.$router.push({ path: '/Login' })
            }else{
                this.$router.push({ path: '/Settings' })
            }
        },
        handleSettings() {
            if (sessionStorage.users) {
                this.$router.push({ path: '/Settings' })
            } else {
                this.$router.push({ path: '/Login' })
            }
        },
        signOut() {
            MessageBox.confirm('真的要走吗?').then(action => {
                //去除sessionStorage.users
                sessionStorage.removeItem('users');
                //刷新页面
                window.location.reload();
            }).catch(err => {
                console.log('no')
            })
        }
    },
    mounted() {
        //判断登录状态
        if (sessionStorage.users) {
            this.hasUser = true;
        } else {
            this.hasUser = false;
        }
        //获取用户session数据
        let users = sessionStorage.getItem('users');
        if (users) {
            users = JSON.parse(users);
            this.user.username = users.username || "";
            this.user.useravatar = users.avatar || "";
            this.user.leftname = users.username || "";
        }
    }
}
</script>

<style>
#top{

}
#top .mu-appbar {
    background-color: #f48fb1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    transition: top .5s;
    z-index: 666;
    height: 54px;
}

.userImg {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}

.userInfo {
    display: inline-block;
}

.loginImg {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #ddd;
    border-style: none;
}
.nameSize{
    font-size: 18px;

}
.mu-list{
    padding: 0;
}

/*利用vertical-align实现div中img垂直居中*/

.align {
    vertical-align: middle;
    font-style: normal;
}

.padleft {
    padding: 5px;
}
#top .mu-paper-1 {
     box-shadow: 0 0px 0px rgba(0,0,0,.117647), 0 0px 0px rgba(0,0,0,.117647); 
}
.mu-overlay{
    opacity: 0.5;
}
.leftNav{
    background-color: #f48fb1;
    height: 4rem;
    color: #fff;
    padding-top: 1rem;
}
.leftImg{
    margin-left: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
}
    .leftName{
        margin-left: 0.5rem;
        font-size: 18px;
    }
</style>
