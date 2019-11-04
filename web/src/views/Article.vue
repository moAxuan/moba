<template>
  <div class="page-article" v-if="model">
    <div class="d-flex title py-3 px-2">
      <router-link to="/" tag="div" class="text-blue-1 icon-Back">&lt;</router-link>
      <b class="flex-1 pl-2 text-ellipsis text-blue-1">{{model.title}}</b>
      <div class="text-grey fs-xs ml-4">{{model.createdAt | data}}</div>
    </div>
    <div v-html="model.body" class="body fs-lg" style="line-height:20px;"></div>
    <div class="footer px-3 py-3">
      <i></i>
      <b class="text-blue-1 ml-1" style="font-size:1.7692307692307692rem;">相关咨询</b>
    </div>
    <div class="pt-2">
      <router-link class="py-2 " tag="div" :to="`/article/${item._id}`"   
      v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    id: { required: true }
  },
  filters: {
    data(val){
      return dayjs(val).format('YYYY  -MM-DD')
    }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id(){
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables';
.page-article {
  max-width:655px;
  margin:0 auto;
  .title {
    border-bottom: 1px solid $border-color;
  }
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      display: block;
      max-width: 80%;
      height: auto;
      margin:0 auto;
    }
  }
  .footer {
    border-top: 10px solid $border-color;
  }
}
</style>