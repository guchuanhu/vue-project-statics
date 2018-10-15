<template>
    <div class="book-list">
        <ul class="ul0 ulcolor0">
            <li @drag="ulDrag" @mousedown="ulMouse($event,index)" v-for="(item,index) in arr0" :data-index="{index}" :key="item" :class="{ul_li : (index%2!==0)&&item!=null}">{{item}}</li>
        </ul>
        <ul class="ul0 ulcolor1">
            <li @drag="ulDrag"  @mousedown="ulMouse($event,index)" v-for="(item,index) in arr1" :key="item" :class="{ul_li : (index%2==0)&&item!=null}">{{item}}</li>
        </ul>
        <ul class="ul0 ulcolor2">
            <li @drag="ulDrag"  @mousedown="ulMouse($event,index)" v-for="(item,index) in arr2" :key="item" :class="{ul_li : (index%2!==0)&&item!=null}">{{item}}</li>
        </ul>
    </div>
</template>

<script>
import Vue from 'Vue';

export default {
  name: 'hanoi',
  data () {
    return {
        s:"false",
      arr0: [0,1,2,3,4,5,6,7],
      arr1: [null,null,null,null,null,null,null,null],
      arr2: [null,null,null,null,null,null,null,null],
      dragX: {
          first: 0,
          next: 0,
          last: 0
      },
      arr:{
          name:null,
          index:null
      }
    }
  },
  created(){//47.98.198.248

  },
  methods: {
      ulMouse(e,index){
          console.log(e);
          console.log("index="+index);
          e.target.setAttribute("draggable",false);
          console.log("item="+this["arr"+(e.target.parentNode.className.split("ulcolor")[1]-0)][index]);


        if((this["arr"+(e.target.parentNode.className.split("ulcolor")[1]-0)][index-1]===undefined||this["arr"+(e.target.parentNode.className.split("ulcolor")[1]-0)][index-1]===null)&&this["arr"+(e.target.parentNode.className.split("ulcolor")[1]-0)][index]!==null){//判断最顶端的数字，变为可拖拽，记录数字
            e.target.setAttribute("draggable",true);
            this.arr.name = "arr"+(e.target.parentNode.className.split("ulcolor")[1]-0);
            this.arr.index = index;
        }else{//初始化拖拽数字
            this.arr.name = null;
            this.arr.index = null;
        }
      },
      selfUse(arry){
            arry.forEach((v,i,a) => {
                if(v!==null&&a[i-1]===null&&v>this[this.arr.name][this.arr.index]){//找到最后一个null
                    Vue.set(a,i-1,this[this.arr.name][this.arr.index]);
                    //删除原位置的数字
                    Vue.set(this[this.arr.name],this.arr.index,null);
                }else if(i===(a.length-1)&&v===null){//最后一个位置是null
                    Vue.set(a,i,this[this.arr.name][this.arr.index]);
                    //删除原位置的数字
                    Vue.set(this[this.arr.name],this.arr.index,null);
                }
            });
      },
      ulDrag(e){
        if(this.dragX.first === 0){//记录第一次的位置
            this.dragX.first = e.clientX;
        }
        if(e.clientX !== 0){//记录下一次的位置
            this.dragX.next = e.clientX;
        }
        
        if(e.clientX === 0){//拖拽结束
            this.dragX.last = this.dragX.next - this.dragX.first;
            this.dragX.first = e.clientX;
            console.log(this);
            if(e.target.parentNode.className.split("ulcolor")[1]-0===0){
                if(this.dragX.last>20&&this.dragX.last<40){//拖入第二个槽
                    console.log(2);
                    //确定拖拽到哪里，并增加数字
                    this.selfUse(this.arr1);
                }else if(this.dragX.last>55&&this.dragX.last<76){//拖入第三个槽
                    console.log(3);
                    this.selfUse(this.arr2);
                }
            }else if(e.target.parentNode.className.split("ulcolor")[1]-0===1){
                if(this.dragX.last>-40&&this.dragX.last<-20){//拖入第1个槽
                    console.log(2);
                    this.selfUse(this.arr0);
                }else if(this.dragX.last>20&&this.dragX.last<40){//拖入第三个槽
                    console.log(3);
                    this.selfUse(this.arr2);
                }
            }else if(e.target.parentNode.className.split("ulcolor")[1]-0===2){
                if(this.dragX.last>-40&&this.dragX.last<-20){//拖入第二个槽
                    console.log(2);
                    this.selfUse(this.arr1);
                }else if(this.dragX.last>-76&&this.dragX.last<-55){//拖入第1个槽
                    console.log(3);
                    this.selfUse(this.arr0);
                }
            }
        }
        
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
        .ul0{
            vertical-align:bottom;
            list-style: none;
            display: inline-block;
            font-size: 0;
        }
        .ul0 li{
            font-size: 15px;
            width: 30px;
            height: 33px;
            padding: 6px 10px;
            box-sizing: border-box;
        }
        .ul_li{
            background-color: #eee;
        }
        .ulcolor0{
                background-color: rgba(255,0,0,.3);
        }
        .ulcolor1{
                background-color: rgba(0,255,0,.3);
        }
        .ulcolor2{
                background-color: rgba(0,0,255,.3);
        }
</style>
