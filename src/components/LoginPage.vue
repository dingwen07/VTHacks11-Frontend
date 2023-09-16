<script setup>
import {useCookies} from 'vue3-cookies'

let $cookies = useCookies().cookies
</script>

<template>
  <lay-card shadow="always" class="center-element layui-anim layui-anim-scale">
    <h2>Welcome to <span>Chatroom</span>!</h2>
    <br />
    <h3>Please specify your name here:</h3>
    <br/>
    <lay-input placeholder="Your name" v-model="name" :allow-clear="true"/>
    <br/>
    <br/>
    <br/>
    <lay-button type="primary" @click="join">Join</lay-button>
  </lay-card>
</template>

<style scoped>
@media screen and (min-width: 620px) {
  .center-element {
    /* Center the content */
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 35vh;
    width: var(--width);
    /* Offset the content */
    /* Convert the vh to vw*/
    --width: 50vh;
    margin-left: calc((100vw - var(--width)) * 0.5);
    margin-top: 25vh;
    /* Make the border */
    border: 1px solid #e6e6e6;
    background: white;
  }
}

@media screen and (max-width: 620px) {
  .center-element {
    /* Center the content */
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    /* Make the border */
    border: 1px solid #e6e6e6;
    background: white;
  }
}

span {
  font-weight: bolder;
}

</style>