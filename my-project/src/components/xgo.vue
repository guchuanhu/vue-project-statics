<template>
    <div class="book-list">
      
        <myHoney :data-list="list" :data-index="daIndex" :data-show="showAction"></myHoney>
      <div v-for="(item,index) in list" :key="item.bId" class="book-item">
          <img class="img-item" v-bind:src="item.img" :data-index="index" v-on:click="listClick" />
          <ul class="ul-item">
                  <li>书名：{{item.title}}</li>
                  <li>价格：{{item.price[item.price.length-1].price}}</li>
                  <!-- <li>作者：{{item.author}}</li> -->
                  <li>{{item.press}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

import myHoney from '../comp/honey';

import vue from "vue";

export default {
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [],
      choiceNum: null,
      daIndex: 0,
      showAction: false
    }
  },
  components: {
      myHoney
  },
  created(){//47.98.198.248
      let that = this;
      axios.post('http://47.98.198.248:8011/book', {})
        .then(function (response) {
            that.$data.list = response.data.data;
            
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  methods: {
      listClick(e){
        vue.set(this,'daIndex',e.target.getAttribute('data-index'));
        this.showAction = !this.showAction;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .book-list{
            width: 100%;
            padding: 0 150px;
            box-sizing: border-box;
            text-align: center;
            margin-top: 20px;
        }
        .book-item{
            margin-right: 20px;
            margin-bottom: 20px;
            display: inline-block;
            width: 200px;
            height: 300px;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            background-color: #faf4cc;
            box-shadow: 2px 2px 10px #666;
        }
        .img-item{
            width: 100%;
        }
        .ul-item{ 
            height: 90px;
            overflow-y: auto;
            margin: 0 10px;
            font-size: 13px;
            color: #1e2730;
            text-align: left;
        }
</style>
