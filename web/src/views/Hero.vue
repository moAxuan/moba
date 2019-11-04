<template>
  <div v-if="model">
    <div class="topbar py-2 px-3 d-flex ai-center" style="background:rgba(0,0,0,0.7)">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1 text-white" style="line-height:30px;">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
     <button type="button" class="btn bg-primary">更多英雄&gt;</button>
    </div>
    <div class="text-white w-100 " style="height:180px;background:#212426;padding-top:100px;">
      <div class="pl-3" style="">{{model.title}}</div>
      <div class="pl-3 fs-xxl mt-3"><b>{{model.name}}</b></div>
      <div class="pl-3 mt-2 fs-xxs">
        难度：<span class="bg-primary px-1 " style="border-radius:50%;">{{model.scores["difficult"]}}</span>
        技能：<span class="bg-blue-1 px-1 " style="border-radius:50%;">{{model.scores["skills"]}}</span>
        攻击：<span class="bg-red-1 px-1 " style="border-radius:50%;">{{model.scores["attack"]}}</span>
        生存：<span class="bg-grey px-1 " style="border-radius:50%;">{{model.scores["survive"]}}</span>
      </div>
    </div>
    <div class="mt-3 bg-white">
      <div style="width:90%;margin:0 auto;">
        <div class="fs-xl pt-3 mb-2"><b>使用技巧</b></div>
        <div class="text-dark-1 pb-2">{{model.usageTips}}</div>
      </div>
      
    </div>
    <div class="mt-3 bg-white">
      <div style="width:90%;margin:0 auto;">
        <div class="fs-xl pt-3 mb-2"><b>对抗技巧</b></div>
        <div class="text-dark-1 pb-2">{{model.battleTips}}</div>
      </div>
    </div>

    <div class="mt-3 bg-white ">
      <div style="width:90%;margin:0 auto;">
        <div class="fs-xl pt-3 mb-2"><b>团队技巧</b></div>
        <div class="text-dark-1 pb-2">{{model.teamTips}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data(){
    return {
      model:null
    };
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`hero/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>

<style lang="scss">

</style>