<template>
  <div class="home">
    <top-line></top-line>
    <nav class="nav-line">
      <div
        @click="handleNavconClick(1)"
        :class="['nav-con', 'nav-con1', { active1: activeNav === 1 }]"
      ></div>
      <div
        :class="['nav-con', 'nav-con2', { active2: activeNav === 2 }]"
        @click="handleNavconClick(2)"
      ></div>
      <div
        :class="['nav-con', 'nav-con3', { active3: activeNav === 3 }]"
        @click="handleNavconClick(3)"
      ></div>
      <!-- <router-link to="/ch" class="nav-con nav-con4"></router-link> -->
      <div
        :class="['nav-con', 'nav-con4', { active4: activeNav === 4 }]"
        @click="handleNavconClick(4)"
      ></div>
    </nav>
    <p class="lines"></p>
    <div class="main-box" ref="mainScroll">
      <ul>
        <li v-for="(item, index) in listData" :key="index">
          <a :href="item.url.replace('/news/', '/pnews/')">
            <img :src="item.imgUrls[0]" alt="" />
            <p class="name">{{ item.title }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopLine from "@/components/TopLine.vue";
import BScroll from "better-scroll";
export default {
  name: "Home",
  data() {
    return {
      activeNav: 1,
      listData: [],
      pageCount: 0,
      totalCount: 0
    };
  },
  components: { TopLine },
  methods: {
    handleNavconClick(num) {
      if (this.activeNav === num) {
        return false;
      }
      this.activeNav = num;
      switch (num) {
        case 1:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: 0,
            specialId: "2217683" //资讯
          });
          this.bs.scrollTo(0, 0, 100);
          this.initScroll();
          break;
        case 2:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: 0,
            specialId: "2217686" //申影
          });
          this.bs.scrollTo(0, 0, 100);
          this.initScroll();
          break;
        case 3:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: 0,
            specialId: "2217713" //视觉
          });
          this.bs.scrollTo(0, 0, 100);
          this.initScroll();
          break;
        default:
          this.listData = null;
      }
    },
    initScroll() {
      this.bs = new BScroll(this.$refs.mainScroll, {
        probeType: 3,
        click: true,
        pullUpLoad: {
          threshold: -30
        }
      });
      this.watchOnPullingUp();
    },
    watchOnPullingUp() {
      this.bs.on("pullingUp", () => {
        console.log("pull");
        if (this.pageCount > this.totalCount) {
          return false;
        } else {
          this.handlePullUp();
        }
      });
    },
    updatedImg() {
      //解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题�?
      //原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确�?
      //利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算�?
      let img = document
        .getElementsByClassName("main-box")[0]
        .getElementsByTagName("img");
      let count = 0;
      let length = img.length;
      if (length) {
        let timer = setInterval(() => {
          if (count == length) {
            // console.log('refresh')
            this.bs.refresh();
            clearInterval(timer);
          } else if (img[count].complete) {
            count++;
          }
        }, 100);
      }
    },
    handlePullUp() {
      switch (this.activeNav) {
        case 1:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: this.pageCount,
            specialId: "2217683" //资讯
          });
          break;
        case 2:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: this.pageCount,
            specialId: "2217686" //申影
          });

          break;
        case 3:
          this.getPicNewsList({
            limitCount: 20,
            skipCount: this.pageCount,
            specialId: "2217713" //视觉
          });

          break;
        default:
          this.listData = null;
      }
    },
    getPicNewsList(parm) {
      this.$axios({
        method: "post",
        url: "/Special/SpecialNewsList",
        crossdomain: true,
        data: JSON.stringify(parm),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (parm.skipCount === 0) {
          this.listData = res.data.list;
          this.pageCount = 20;
          this.totalCount =
            res.data.totalCount > 200 ? 200 : res.data.totalCount;
        } else {
          res.data.list.map(item => {
            this.listData.push(item);
          });
          this.pageCount += 20;
          this.bs.finishPullUp();
        }
      });
    }
  },
  created() {
    this.getPicNewsList({
      limitCount: 20,
      skipCount: 0,
      specialId: "2217683" //资讯
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
      this.updatedImg();
    });
  },
  updated() {
    this.bs.refresh();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    listData: function() {
      this.$nextTick(() => {
        this.updatedImg();
      });
    }
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .nav-line {
    width: 100%;
    height: 1.14rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-con {
      height: 100%;
      width: 25%;
    }
    .nav-con1 {
      background: #fff url(../assets/1.jpg) no-repeat center center/auto 100%;
    }
    .nav-con2 {
      background: #fff url(../assets/2.jpg) no-repeat center center/auto 100%;
    }
    .nav-con3 {
      background: #fff url(../assets/3.jpg) no-repeat center center/auto 100%;
    }
    .nav-con4 {
      background: #fff url(../assets/4.jpg) no-repeat center center/auto 100%;
    }
    .active1 {
      background: #fff url(../assets/1a.jpg) no-repeat center center/auto 100%;
    }
    .active2 {
      background: #fff url(../assets/2a.jpg) no-repeat center center/auto 100%;
    }
    .active3 {
      background: #fff url(../assets/3a.jpg) no-repeat center center/auto 100%;
    }
    .active4 {
      background: #fff url(../assets/4a.jpg) no-repeat center center/auto 100%;
    }
  }
  .lines {
    width: 100%;
    height: 0.09rem;
    background: #eaeaea;
    border-top: 1px solid #bfbfbf;
    margin: 0;
  }
  .main-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 2.2rem;
    overflow: hidden;
    z-index: 100;
    ul {
      width: 100%;
      overflow: hidden;
      li {
        width: 96%;
        margin: 0.1rem auto;
        a {
          display: block;
          width: 100%;
          text-decoration: none;
          img {
            width: 100%;
            display: block;
          }
          .name {
            width: 100%;
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #595757;
            text-align: center;
            margin: 0.1rem 0;
          }
        }
      }
    }
  }
}
</style>
