<template>
  <div>
    <div v-if="ok" class="Progress">
      <mu-circular-progress color="#f48fb1" :size="40"></mu-circular-progress>
    </div>
    <div v-if="!ok">
      <mu-list-item title="综合">
        <mu-icon slot="right" value="starred"></mu-icon>
      </mu-list-item>
      <mu-divider></mu-divider>
  
      <div class="content">
        <div v-for="(item,index) in list" :key="index" :class="index%2==0?'mright':''" class="card">
          <router-link tag="div" :to="'/Recommend/'+item.id">
            <div class="cards">
              <img class="cardImg" :src="item.image">
              <div class="playVolume">播放量：{{item.playVolume}}</div>
              <div class="playtimes">{{ item.playtimes }}</div>
            </div>
            <div class="bottomTitle">
              <div class="titleLength">{{item.moveTitle}}</div>
            </div>
            <div class="flag">播放量：{{item.playVolume}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from '../../api/api.js'
export default {
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.ok = true;
      getRecommend().then(res => {
        this.list = res.Recommend;
        this.ok = false;
      })
    }
  },
  data() {
    return {
      list: [],
      ok: ''
    }
  }
}
</script>

<style>
#all {
  position: absolute;
  left: 0;
  top: 3rem;
  z-index: 1;
}
.mu-item{
  min-height: 1rem;
}

.mu-item-title {
  color: #aaa;
}

.mu-item-right {
  right: -25px;
}

.content {
  margin-left: .256rem;
  margin-right: .256rem;
}

.card {
  width: 4.3rem;
  border: 1px solid #d1dbe5;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  margin: 4px 0 4px 6px;
  display: inline-block;
}

.cards {
  position: relative;
}

.cardImg {
  max-width: 4.3rem;
}

.playVolume {
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 0;
}

.playtimes {
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.bottomTitle {
  padding: 2px 10px;
  height: 1.1rem;
}

.titleLength {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.flag {
  padding: 2px 10px;
  color: #ccc;
  font-size: 12px;
}

.mright {
  margin-right: 0.4rem;
}

.Progress {
  margin-top: 3rem;
  margin-left: 4.5rem;
}
</style>
