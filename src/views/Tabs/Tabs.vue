<template>
    <div id="tabs">
        <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
            <mu-tab @click="tab1" value="tab1" title="直播"></mu-tab>
            <mu-tab @click="tab2" value="tab2" title="推荐"></mu-tab>
            <mu-tab @click="tab3" value="tab3" title="追番"></mu-tab>
            <mu-tab @click="tab4" value="tab4" title="分区"></mu-tab>
            <mu-tab @click="tab5" value="tab5" title="动态"></mu-tab>
            <mu-tab @click="tab6" value="tab6" title="发现"></mu-tab>
        </mu-tabs>
        <keep-alive>
            <router-view id="all"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import router from '../../router/index.js'
export default {
    data() {
        return {
            //首页默认为推荐界面
            activeTab: 'tab2',
            scroll: '',
        }
    },
    //监听滚动条
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            try {
                //获取 顶部用户信息栏
                let top = document.getElementsByClassName('mu-appbar')[0];
                //获取 导航栏以及导航栏的高度
                let tabs = document.getElementsByClassName('tabs')[0];
                let tabTop = tabs.offsetHeight;
                //获取滚动条的高度
                let nt = document.body.scrollTop;
                if (nt > tabTop) {
                    top.style.top="-54px";
                    tabs.style.top="0";
                } else {
                    top.style.top = "0";
                    tabs.style.top="54px";
                }
            }
            // 当跳转到其他页面的时候，系统仍然会执行上面的代码，因为找不到相应的标签元素，就会报错，这里采用try,catch来关闭报错信息
            catch (error) {
            }

        },

        handleTabChange(val) {
            this.activeTab = val
        },
        tab1() {
            router.push({ path: '/Home/Live' })
        },
        tab2() {
            router.push({ path: '/Home/Recommend' })
        },
        tab3() {
            router.push({ path: '/Home/Comic' })
        },
        tab4() {
            router.push({ path: '/Home/Partition' })
        },
        tab5() {
            router.push({ path: '/Home/Dynamic' })
        },
        tab6() {
            router.push({ path: '/Home/Find' })
        }
    }
}
</script>
<style>
.mu-tab-text {
    color: #fff;
}

#tabs .mu-tabs {
    background-color: #f48fb1;
    box-shadow: 0px 5px 8px #ccc;
    position: fixed;
    left: 0;
    top: 54px;
    width: 100%;
    transition: top .5s;
    z-index: 665;
}

.mu-tab-link-highlight {
    background-color: #fff;
}
</style>
