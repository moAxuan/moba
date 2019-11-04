<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="../assets/images/banner2.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner1.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/banner3.jpeg" class="w-100">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" 
      slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1 ">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ">
       <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <m-list-card icon="cc-menu-circle" title="新闻咨询" :categories="newsCats">
      <template #items="{category}">
        <div v-for="(news, i ) in category.newsList" :key="i">
          <router-link tag="div" :to="`/article/${news._id}`" class="py-2 fs-lg d-flex">
            <span class="text-info" > [{{news.categoryName}}] </span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt | data}}</span>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}" >
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <div v-for="(hero, i ) in category.heroList" :key="i" style="width:20%">
            <router-link class="p-2 text-center"  :to="`hero/${hero._id}`">
              <img :src="hero.avatar" alt="" class="w-100">
              <div>{{hero.name}}</div>
            </router-link> 
          </div>
        </div>
      </template>
    </m-list-card>
    
    <m-list-card icon="Recordandbroadcast" title="精彩视频" :categories="movieCats">
      <template #items="{category}">
        <div class="d-flex  flex-wrap jc-between text-center" >
          <div v-for="(movies, i ) in category.movieList" :key="i" class="py-2" style="width:48%;">
            <img src="../assets/images/230x140.1514973379.f13b6ae0ad01c866ee2d0f9209f8297a.230x140_13634.jpg" alt="" class="w-100">
            <p>{{movies.title}}</p>
            <p class="d-flex jc-between ">
              <span class="fs-xxs text-grey-1"><i class="sprite sprite-void"></i>{{movies.bofang}}</span>
              <span class="fs-xxs text-grey-1 d-flex mt-2">{{movies.data}}</span>
            </p>
          </div>
        </div>
        <div class="mt-2 fs-sm text-center">加载更多内容</div>
      </template>
    </m-list-card>

    <m-list-card icon="book" title="图文攻略" :categories="gonglueCats">
      <template #items="{category}">
        <div class="d-flex  flex-wrap ">
          <div v-for="(gong, i ) in category.gongList" :key="i" class="my-2 w-100  jc-start d-flex " style="height:95px;"  >
              <img src="../assets/images/230x140.1514973379.f13b6ae0ad01c866ee2d0f9209f8297a.230x140_13634.jpg" alt="" style="height:100%;">
              <div class="mx-2 " style="width:60%;height:100%;">
                <p class="my-0 ">{{gong.title}}</p>
                <p class="text-dark-1 fs-xxs ">{{gong.jianjie}}</p>
                <p class="text-dark-1 fs-xxs">{{gong.data}}</p>
              </div>
          </div>
        </div>
        <div class="mt-2 fs-sm text-center">上拉加载更多</div>
      </template>
    </m-list-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  
  filters: {
    data(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      newsCats: [],
      heroCats: [],
      movieCats : [
        {
          name : '物品栏目',
          movieList: new Array(4).fill({}).map(v => ({
            title:"零度带你飞",
            bofang:"27.4万",
            data: '06/01'
          }))
        },
        {
          name : '英雄攻略',
          movieList: new Array(4).fill({}).map(v => ({
            title:"零度带你飞",
            bofang:"27.4万",
            data: '06/01'
          }))
        },
        {
          name : '赛事精品',
          movieList: new Array(4).fill({}).map(v => ({
            title:"零度带你飞",
            bofang:"27.4万",
            data: '06/01'
          }))
        },
        {
          name : '赛事视频',
          movieList: new Array(4).fill({}).map(v => ({
            title:"零度带你飞",
            bofang:"27.4万",
            data: '06/01'
          }))
        }
      ],

      gonglueCats : [
        {
          name : '最新',
          gongList: new Array(4).fill({}).map(v => ({
            title:"上分射手推荐：后羿易上手...",
            jianjie:"上分射手推荐：后羿易上手短腿遍地走",
            data: '06/01'
          }))
        },
        {
          name : '英雄',
         gongList: new Array(4).fill({}).map(v => ({
            title:"上分射手推荐：后羿易上手...",
            jianjie:"上分射手推荐：后羿易上手短腿遍地走",
            data: '06/01'
          }))
        },
        {
          name : '新手',
          gongList: new Array(4).fill({}).map(v => ({
            title:"上分射手推荐：后羿易上手...",
            jianjie:"上分射手推荐：后羿易上手短腿遍地走",
            data: '06/01'
          }))
        },
        {
          name : '官方',
          gongList: new Array(4).fill({}).map(v => ({
            title:"上分射手推荐：后羿易上手...",
            jianjie:"上分射手推荐：后羿易上手短腿遍地走",
            data: '06/01'
          }))
        },
        {
          name : '同人',
          gongList: new Array(4).fill({}).map(v => ({
            title:"上分射手推荐：后羿易上手...",
            jianjie:"上分射手推荐：后羿易上手短腿遍地走",
            data: '06/01'
          }))
        }
      ],
    };
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background:map-get($colors,'white');
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors,'info');
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width:25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n+1){
      border-left: none;
    }
  }
}
a {
  text-decoration: none;
}
</style>
