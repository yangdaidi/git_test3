<template>
<div class="index-page">
  <city label="address" ref="addr"></city>
</div>
</template>

<script>
  // 组件的应用采用驼峰写法，实际使用的时候中间用‘-’替换
  import city from '../components/city'
  import tool from '../store/tool'

  export default {
    name: 'index',
    data() {
        vara : "hello template",
        varb : null,
      }
    },
    mounted(){
      this.helloIndex(vara);
    },
    methods{
      helloIndex(txt) {
        console.log(txt);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 使用less只需要npm i less less-loader -(\转义)-save-dev即可，其他地方不需要再引入，webpack可以自己识别 -->
<style scoped lang="less">
.index-page{font-size: 0.14rem;}
</style>
