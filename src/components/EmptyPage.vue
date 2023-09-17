<script setup>
import {ref} from "vue";

const props = defineProps({
  user_id: String,
  user_name: String
})
</script>

<template>
  <div class="layui-anim layui-anim-scale center">
    <h1>👋 Hi, {{ props.user_name }}!</h1>
    <br/>
    <br/>
    <h3>Welcome to <b>Chatroom</b>!</h3>
    <br/>
    <p>Click the + button on the left to create or join a chatroom!</p>
  </div>
</template>

<style scoped>
.center {
  /* Center the content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 30vh;
  width: var(--width);
  /* Offset the content */
  /* Convert the vh to vw*/
  --width: 50vh;
  margin-left: calc((100vw - var(--width)) * 0.5);
  margin-top: 35vh;
}
</style>