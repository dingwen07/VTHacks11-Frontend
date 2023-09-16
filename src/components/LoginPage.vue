<script setup>
import { useCookies } from 'vue3-cookies'
let $cookies = useCookies().cookies
</script>

<template>
    <lay-card shadow="hover" class="center-element">
      <lay-row>
        <lay-col>
          <h2>Welcome!</h2>
        </lay-col>
        <lay-col>
          <h3>Please specify your name here:</h3>
        </lay-col>
        <br/>
        <lay-col>
          <lay-input placeholder="Your name" v-model="name" :allow-clear="true"/>
        </lay-col>
        <br/>
        <lay-col>
          <lay-button type="primary" @click="join" md="8" mdOffset="16">Join</lay-button>
        </lay-col>
      </lay-row>
    </lay-card>
</template>

<style scoped>
.center-element {
  /* Center the content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  width: 50vw;
  /* Offset the content */
  margin-left: 25vw;
  margin-top: 25vh;
  /* Make the border */
  border: 1px solid #e6e6e6;
  background: white;
}
</style>