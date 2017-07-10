<template>
    <div id="login">
        <mu-appbar class="topTitle" title="登录">
            <mu-icon-button @click="handleBack" icon="reply" slot="left"></mu-icon-button>
            <mu-flat-button @click="handleBackPwd" label="忘记密码" slot="right"></mu-flat-button>
        </mu-appbar>
        <div class="loginInput">
            <mu-text-field label="用户名" v-model="form.username" hintText="输入你的账号" labelFloat></mu-text-field>
            <br>
            <mu-text-field label="密码" v-model="form.pwd" hintText="请输入密码" type="password" @keyup.enter.native="handleLogin" labelFloat></mu-text-field>
            <br>
        </div>
        <div class="loginBtn">
            <mu-raised-button label="注册" class="demo-raised-button registerbutton"></mu-raised-button>
            <mu-raised-button @click="handleLogin" label="登录" class="demo-raised-button loginbutton" secondary></mu-raised-button>
        </div>
    </div>
</template>

<script>
import { Login } from '../../api/api.js'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
export default {
    methods: {
        //返回之前的页面
        handleBack() {
            window.history.go(-1);
        },
        //跳转到找回密码页面，空缺页面
        handleBackPwd() {
            window.history.go(-1);
        },

        //提示弹窗
        //登录
        handleLogin() {
            if (1 > 0) {
                let loginParams = {
                    username: this.form.username,
                    password: this.form.pwd
                }
                Login(loginParams).then(data => {
                    let { msg, code, users } = data;
                    if (code == 200) {
                        sessionStorage.setItem('users', JSON.stringify(users));
                        window.history.go(-1);
                    } else {
                        Toast({
                            message: msg,
                            position: 'middle',
                            duration: 3000
                        })
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }

        }
    },
    data() {
        return {
            form: {
                username: '',
                pwd: '',
            },
            toast: false
        }
    }
}
</script>

<style>
.mu-appbar {
    background-color: #f48fb1;
}

.mu-text-field.focus-state {
    color: #f48fb1;
}

.mu-text-field-focus-line {
    background-color: #f48fb1;
}

.loginInput {
    text-align: center;
}

.loginBtn {
    text-align: center;
}

.registerbutton {
    width: 3.5rem;
}

.loginbutton {
    width: 3.5rem;
    background-color: #f48fb1;
}
</style>
