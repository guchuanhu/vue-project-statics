<template>

  <div id="app">
    <div class="head">
        <ul>
          <li><router-link to="/list">当当书店</router-link></li>
          <li><router-link to="/hanoi">河内塔</router-link></li>
          <li><router-link to="/hello">2048</router-link></li>
        </ul>
    </div>
    
    <router-view/>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'App',
  methods: {
      getEmailCode () {
          axios.post('http://localhost:8011/book', {})
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
      }
  }
}
</script>


<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a:active{
    color:black;
}
a:link{
    color:black;
}
a:visited{
    color:black;
}
.head{
    width: 100%;
    height: 100px;
    background-color: aliceblue;
}
.head ul{
    list-style: none;
    text-align: center;
}
.head ul li{
    height: 100%;
    width: 100px;
    display: inline-block;
    line-height: 100px;
    cursor: pointer;
}
.head ul li a{
    height: 100%;
    width: 100px;
    display: inline-block;
    line-height: 100px;
    cursor: pointer;
}
.head ul li:hover{
    background-color: #c5edf6;
    color: #4d4203;
}
</style>
