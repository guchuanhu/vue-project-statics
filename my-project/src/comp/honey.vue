<template>
    <div v-if="honeyshow" class="container" v-on:click="listClick">
        <div class="closebox" v-on:click="showitem">
          <span class="close">X</span>
        </div>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        <div class="boxleft">
          <img class="img-item" v-bind:src="this.dataList[this.dataIndex].img" />
        </div>
        <div class="boxright">
          <p>作者：{{this.dataList[this.dataIndex].author}}</p>
          <p>{{this.dataList[this.dataIndex].press}}</p>
          <p>{{this.dataList[this.dataIndex].publishingTime}}</p>
          <p>书名：{{this.dataList[this.dataIndex].title}}</p>
          <a class="pointer" v-bind:href="this.dataList[this.dataIndex].url">前往商城go</a>
        </div>
    </div>
</template>

<script>
import Vue from "vue"

import VeLine from 'v-charts/lib/line.common'

import formatDate from '../comfunc/date.js';
let that;

//Vue.component(VeLine.name, VeLine)
export default {
  name: 'honey',
  data () {
    this.chartSettings = {
        metrics: ['price'],
        dimension: ['date']
    }
    return {
      msg: 'chart',
      chartData: {
        columns: ['date', 'price'],
        rows: []
      },
      honeyshow: false
    }
  },
  components: {
    VeLine
  },
  watch:{
    dataShow:(newdata,olddata)=>{
      if(that.showitem()){
        that.listClick();
      }
    }
  },
  mounted(){
    that = this;
  },
  methods: {
      listClick(e){
          that.chartData.rows = that.priceFuc(that.dataList[that.dataIndex].price);
      },
      priceFuc(arr){
        arr.forEach((v,i,a)=> {
          a[i].date = formatDate(new Date(v.date), 'MM/dd');
        });
        return arr;
      },
      showitem(){
        that.honeyshow = !that.honeyshow;
        return that.honeyshow;
      }
  },
  props:["data-list","data-index","data-show"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    overflow: scroll;
  }
  .close{
    cursor: pointer;
  }
  .closebox{
    text-align: center;
  }
  .boxleft{
    width: 50%;
    float: left;
    text-align: right;
  }
  .boxright{
    width: 50%;
    float: left;
    text-align: left;
  }
  .pointer{
    cursor: pointer;
  }

</style>
