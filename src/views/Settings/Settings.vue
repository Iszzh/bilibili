<template>
  <div class="settings">
    <mu-appbar title="个人设置">
      <mu-icon-button @click="handleBack" icon="reply" slot="left"></mu-icon-button>
    </mu-appbar>
    <div class="data">
      <div class="dataList">
        <div class="dlistLeft">头像</div>
        <div class="dlistRight">
          <img class="listImg" :src="user.avatar" alt="">
        </div>
        <mu-divider></mu-divider>
      </div>
      <div class="dataList">
        <div class="dlistLeft">昵称</div>
        <div class="dlistRight">{{ user.username }}</div>
        <mu-divider></mu-divider>
      </div>
      <div class="dataList">
        <div class="dlistLeft">个人简介</div>
        <div class="dlistRight">{{ user.introduce }}</div>
        <mu-divider></mu-divider>
      </div>
    </div>
    <div @click="signout" class="data">
      <div class="dataList">
        <div class="signout">
          退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        avatar: '',
        introduce: ''
      }
    }
  },
  methods: {
    handleBack() {
      window.history.go(-1);
    },
    signout() {
      //去除sessionStorage.users
      sessionStorage.removeItem('users');
      this.$router.push({ path: '/Home/Recommend' })
      //刷新页面
      //window.location.reload();
    }
  },
  mounted() {
    let users = sessionStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);
      this.user.username = users.username || "";
      this.user.avatar = users.avatar || "";
      this.user.introduce =users.introduce || "";
    }
  }
}
</script>

<style>
.mu-appbar {
  height: 1.3rem;
  background-color: #f48fb1;
}

.data {
  margin-top: 0.5rem;
  box-shadow: 0px 5px 8px #ccc;
}

.dataList {
  background-color: #f9f9f9;
  height: 1.3rem;
}

.dlistLeft {
  float: left;
  line-height: 1.3rem;
  padding-left: 0.5rem;
  font-size: 0.4rem;
  font-weight: 600;
}

.dlistRight {
  float: right;
  line-height: 1.3rem;
  padding-right: 0.5rem;
  font-size: 0.4rem;
  color: #aaa;
}
.listImg{
  width: 30px;
  vertical-align: middle;
  border-radius: 30px;
}
.signout {
  text-align: center;
  line-height: 1.3rem;
  color: #bbb;
}
</style>
