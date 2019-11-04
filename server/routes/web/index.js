module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Item = mongoose.model('Item')
  const Hero = mongoose.model('Hero')
  const News = require('../../models/Article')

  router.get('/news/init',async(req, res) => {
    const parent = await Category.findOne({
      name : '新闻分类'
    })
    const cats = await Category.find().where({
      parent : parent
    }).lean()
    const newsTitles = ["新版本爆料①丨S16赛季王者峡谷最新调整，盾山赛季皮肤现身！", "匹配机制优化 | 想玩英雄不重位，阵容搭配新体验！", "夏日新版本“稷下星之队”即将6月上线", "王者荣耀携手两大博物馆 走进稷下学宫", "王者大陆第一学院【稷下】档案", "6月18日全服不停机修复公告", "6月18日全服不停机更新公告", "6月14日安卓建议更新公告", "【已修复】王者大陆的端午宝藏活动页面异常问题说明", "6月18日体验服停机更新公告", "恭喜eStarPro捧起银龙杯 赛末冲刺惊喜礼不断", "【稷下的邀约】活动公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "KRKPL：EMC和Nova成功会师决赛 世冠杯KRKPL赛区表现可期", "KPL鱼你说-这局我看行"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5) 
      return {
        categories : randomCats.slice(0,2),
        title : title
      } 
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList) 
  })
  router.get('/news/list', async(req,res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门')
          ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })
  router.get('/news/list/:id', async(req,res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门')
          ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })
  router.get('/heroes/init', async(req, res) => {
    await Hero.deleteMany({})
    var rawData = [{"name":"热门","heroes":[{"name":"后羿","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"孙悟空","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"铠","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"鲁班七号","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"亚瑟","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"甄姬","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"典韦","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"孙尚香","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"庄周","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"吕布","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"}]},{"name":"战士","heroes":[{"name":"赵云","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"钟无艳","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"曹操","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"露娜","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"亚瑟","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"狂铁","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"李信","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"}]},{"name":"法师","heroes":[{"name":"小乔","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"扁鹊","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"姜子牙","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"沈梦溪","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"}]},{"name":"坦克","heroes":[{"name":"廉颇","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"刘禅","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"白起","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"夏侯惇","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"项羽","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"牛魔","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"东皇太一","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"苏烈","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"猪八戒","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"}]},{"name":"刺客","heroes":[{"name":"阿轲","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"韩信","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"娜可露露","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"百里玄策","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"云中君","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"}]},{"name":"射手","heroes":[{"name":"孙尚香","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"}]},{"name":"辅助","heroes":[{"name":"庄周","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"孙膑","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"蔡文姬","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"鬼谷子","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"http://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"}]}]
    for(let cat of rawData){
      if(cat.name === '热门'){
        continue
      }
      const category = await Category.findOne({
        name: cat.name
      })
      
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })
  router.get('/items/init',async(req, res) => {
    var rawData = [{"name":"纯净苍穹","icon":"http://newsimg.5054399.com/uploads/litimg/161025/163I3164Q00.jpg"},{"name":"制裁之刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GP51B0Z.jpg"},{"name":"速击之枪","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GP0422935.jpg"},{"name":"冲能拳套","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GKF2ED.jpg"},{"name":"雷鸣刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GK50U016.jpg"},{"name":"宗师之力","icon":"http://newsimg.5054399.com/uploads/userup/1703/0Q03521P46.jpg"},{"name":"铁剑","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GFZ52624.jpg"},{"name":"匕首","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GG300Ca.jpg"},{"name":"疾步之靴","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1519221M60K.jpg"},{"name":"搏击拳套","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GG43KT7.jpg"},{"name":"风暴巨剑","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GG60O116.jpg"},{"name":"秘法之靴","icon":"http://newsimg.5054399.com/uploads/litimg/151015/1032222152004.jpg"},{"name":"日冕","icon":"http://newsimg.5054399.com/uploads/170408/_115942410.jpg"},{"name":"狂暴双刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GG9143527.jpg"},{"name":"冷静之靴","icon":"http://newsimg.5054399.com/uploads/litimg/151015/101H42153229.jpg"},{"name":"吸血之镰","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GH05Wa5.jpg"},{"name":"抵抗之靴","icon":"http://newsimg.5054399.com/uploads/litimg/151015/1010112159640.jpg"},{"name":"影忍之足","icon":"http://newsimg.5054399.com/uploads/litimg/151015/10052121524Z.jpg"},{"name":"神速之靴","icon":"http://newsimg.5054399.com/uploads/litimg/151015/095T52153249.jpg"},{"name":"陨星","icon":"http://newsimg.5054399.com/uploads/userup/1705/ertong_b07c2fbdfa78bc5dfc930f5ccf004a1f.png?1"},{"name":"急速战靴","icon":"http://newsimg.5054399.com/uploads/userup/1510/151033424408.jpg"},{"name":"破魔刀","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GHA5X33.jpg"},{"name":"末世","icon":"http://newsimg.5054399.com/uploads/userup/1703/0915141cK0.jpg"},{"name":"追击刀锋","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1549291M4S9.jpg"},{"name":"名刀司命","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GI4155L9.jpg"},{"name":"巡守利斧","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1546431M95S.jpg"},{"name":"游击弯刀","icon":"http://newsimg.5054399.com/uploads/litimg/160518/15432QMS22.jpg"},{"name":"碎星锤","icon":"http://newsimg.5054399.com/uploads/userup/1804/ertong_d201ba8d6e0d7a4ae127013f1d838c02.jpg?1"},{"name":"狩猎宽刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q52T95604.jpg"},{"name":"泣血之刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GIT56193.jpg"},{"name":"无尽战刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GJ2352P8.jpg"},{"name":"破军","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GJ5202360.jpg"},{"name":"符文大剑","icon":"http://newsimg.5054399.com/uploads/userup/1710/ertong_023352a49ddc44cac60e74bafcfbc2fa.jpg?1"},{"name":"闪电匕首","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GJF315a.jpg"},{"name":"影刃","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GJ9464627.jpg"},{"name":"巨人之握","icon":"http://newsimg.5054399.com/uploads/userup/1710/ertong_68eac8f1f5c5e5902908cfb993d75e3d.jpg?1"},{"name":"暗影战斧","icon":"http://newsimg.5054399.com/uploads/userup/1605/1GK1462441.jpg"},{"name":"贪婪之噬","icon":"http://newsimg.5054399.com/uploads/userup/1710/ertong_60b699bb6bf9e3c3c709ff3adddc43e4.jpg?1"},{"name":"贤者之书","icon":"http://newsimg.5054399.com/uploads/litimg/160518/150P41MP17.jpg"},{"name":"圣杯","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1505201M2Y9.jpg"},{"name":"梦魇之牙","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1501521M4036.jpg"},{"name":"元素杖","icon":"http://newsimg.5054399.com/uploads/litimg/160518/1454401M2126.jpg"},{"name":"咒术典籍","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q4022QE1.jpg"},{"name":"蓝宝石","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q404111346.jpg"},{"name":"炼金护符","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q406453949.jpg"},{"name":"圣者法典","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q40SX1a.jpg"},{"name":"大棒","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q4095KG5.jpg"},{"name":"血族之书","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q4111X344.jpg"},{"name":"光辉之剑","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q4130V328.jpg"},{"name":"魅影面罩","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q4163122O.jpg"},{"name":"进化水晶","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q42A4X55.jpg"},{"name":"破碎圣杯","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q42Z15E5.jpg"},{"name":"虚无法杖","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q434494B1.jpg"},{"name":"博学者之怒","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q43R435X.jpg"},{"name":"回响之杖","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q44100a41.jpg"},{"name":"冰霜法杖","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q442591595.jpg"},{"name":"痛苦面具","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q44523T16.jpg"},{"name":"巫术法杖","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q44FDZ5.jpg"},{"name":"时之预言","icon":"http://newsimg.5054399.com/uploads/userup/1605/1Q450114211.jpg"},{"name":"贤者的庇护","icon":"http://newsimg.5054399.com/uploads/litimg/160519/1206121M3G5.jpg"},{"name":"冰痕之握","icon":"http://newsimg.5054399.com/uploads/litimg/160519/1203111MJJ.jpg"},{"name":"冰霜长矛","icon":"http://newsimg.5054399.com/uploads/userup/1703/0915032QE3.jpg"},{"name":"血魔之怒","icon":"http://newsimg.5054399.com/uploads/litimg/160519/11542QMX54.jpg"},{"name":"红玛瑙","icon":"http://newsimg.5054399.com/uploads/userup/1605/1910561392Z.jpg"},{"name":"布甲","icon":"http://newsimg.5054399.com/uploads/litimg/151014/1439162154053.jpg"},{"name":"抗魔披风","icon":"http://newsimg.5054399.com/uploads/userup/1605/19105P291T.jpg"},{"name":"提神水晶","icon":"http://newsimg.5054399.com/uploads/userup/1605/191100491E0.jpg"},{"name":"力量腰带","icon":"http://newsimg.5054399.com/uploads/userup/1605/1911054LG5.jpg"},{"name":"熔炼之心","icon":"http://newsimg.5054399.com/uploads/userup/1605/19110FSB5.jpg"},{"name":"神隐斗篷","icon":"http://newsimg.5054399.com/uploads/userup/1605/19110U0WL.jpg"},{"name":"雪山圆盾","icon":"http://newsimg.5054399.com/uploads/userup/1605/1911140K641.jpg"},{"name":"守护者之铠","icon":"http://newsimg.5054399.com/uploads/userup/1605/19111G0Z15.jpg"},{"name":"近卫荣耀","icon":"http://newsimg.5054399.com/uploads/userup/1704/0Q1324540S.jpg"},{"name":"反伤刺甲","icon":"http://newsimg.5054399.com/uploads/userup/1605/19112350Y35.jpg"},{"name":"红莲斗篷","icon":"http://newsimg.5054399.com/uploads/userup/1605/191126293431.jpg"},{"name":"霸者重装","icon":"http://newsimg.5054399.com/uploads/userup/1605/191131015502.jpg"},{"name":"不详征兆","icon":"http://newsimg.5054399.com/uploads/170408/_113U3H8.jpg"},{"name":"不死鸟之眼","icon":"http://newsimg.5054399.com/uploads/userup/1703/ertong_ea3944b16410a25a171f21a55e2107d0.jpg"},{"name":"魔女斗篷","icon":"http://newsimg.5054399.com/uploads/userup/1605/191143223257.jpg"},{"name":"极寒风暴","icon":"http://newsimg.5054399.com/uploads/userup/1703/0915203O3P.jpg"},{"name":"暴烈之甲","icon":"http://newsimg.5054399.com/uploads/userup/1605/19114951b00.jpg"},{"name":"噬神之书","icon":"http://newsimg.5054399.com/uploads/userup/1703/ertong_c6b183cbc24ce30acd6e7ab04f0463ab.png"},{"name":"奔狼纹章","icon":"http://newsimg.5054399.com/uploads/userup/1704/ertong_471392ac4913dc67858990b12838015f.jpg?1"},{"name":"辉月","icon":"http://newsimg.5054399.com/uploads/userup/1703/ertong_47dcd9fa332de220d7b9c87862a64f1f.jpg"},{"name":"炽热支配者","icon":"http://newsimg.5054399.com/uploads/userup/1703/ertong_a20f31ff28d57655f28f199bf7e28f32.jpg"},{"name":"逐日之弓","icon":"http://newsimg.5054399.com/uploads/userup/1703/0914413E522.jpg"},{"name":"近卫荣耀","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_39c8422378b471efeefa3c972abfbb0c.jpg?1"},{"name":"奔狼纹章","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_aaf6eaafaf3b23e69d200e09771a2bfe.jpg?1"},{"name":"救赎之翼","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_d3d124192d9992e617cd89263ded3994.jpg?1"},{"name":"极影","icon":"http://newsimg.5054399.com/uploads/userup/1904/ertong_20d99ec8e3a8697b719dbe053e4ba708.jpg?1"},{"name":"鼓舞之盾","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_8ebd7f5d46a0d8ef050bc599809774ac.jpg?1"},{"name":"风灵纹章","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_2326f9164e13b3f5a39007e3f951648a.jpg?1"},{"name":"风之轻语","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_1c7d1e30273501610260e501cd2b2c30.jpg?1"},{"name":"凤鸣指环","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_ecb367e3af1211a9118452bc78b5eca5.jpg?1"},{"name":"学识宝石","icon":"http://newsimg.5054399.com/uploads/userup/1706/ertong_e702d27e27dc22c975dee4c08498db9b.jpg?1"},{"name":"穿云弓","icon":"http://newsimg.5054399.com/uploads/userup/1804/ertong_3462a39e08a0b73348e8f25bec8eb052.jpg?1"},{"name":"破晓","icon":"http://newsimg.5054399.com/uploads/userup/1804/ertong_06350a9d50c85bfc940090a5b9452b9d.jpg?1"},{"name":"碎骨之锤","icon":"http://newsimg.5054399.com/uploads/userup/1807/ertong_d12aa17d31e32be7c1f6c1c708bc0613.jpg?1"},{"name":"砂之守卫","icon":"http://newsimg.5054399.com/uploads/userup/1807/ertong_4befa87eaedeb854cd3a5f69489775fa.jpg?1"},{"name":"隐匿之甲","icon":"http://newsimg.5054399.com/uploads/userup/1807/ertong_dfc93088f8bb31b3932ea72560a0f4ca.jpg?1"},{"name":"追击刀锋","icon":""},{"name":"巡守利斧","icon":""},{"name":"游击弯刀","icon":""},{"name":"符文大剑","icon":""},{"name":"巨人之握","icon":""},{"name":"贪婪之噬","icon":""}]
    await Item.deleteMany({})
    await Item.insertMany(rawData)
    res.send(rawData)
  })
  router.get('/heroes/list', async(req,res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })

    res.send(cats)

  })

  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2)
    res.send(data)
  })
  router.get('/hero/:id', async(req, res) => {
    const data = await Hero.findById(req.params.id).lean()
    res.send(data)
  })
  app.use('/web/api',router)
}