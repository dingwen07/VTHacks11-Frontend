<script setup>
import {useCookies} from 'vue3-cookies'
import {layer} from "@layui/layui-vue";
import {ref} from "vue";

let $cookies = useCookies().cookies

const props = defineProps({
  theme: String
})

const name = ref('')

async function join() {
  if (name.value === "") {
    layer.msg("Please specify your name!")
  } else {
    let res = await fetch(
        'http://172.29.146.39:8080/user',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": name.value
          }),
          sameSite: 'none'
        }
    ).then(res => res.json())

    if (res.status === 0 || res.status === 200) {
      $cookies.set("user_id", res.data.userId, 60 * 60 * 24 * 7)
      window.location.reload()
    } else {
      layer.msg("Cannot create the user!")
    }
  }
}


</script>

<template>
  <lay-card shadow="always" class="center-element layui-anim layui-anim-scale">
    <lay-icon @click="$emit('themeToggled')"
              :class="props.theme === 'light' ? 'layui-icon-moon' : 'layui-icon-light'" id="theme-switch"></lay-icon>
    <h2>Welcome to <span>Chatroom</span>!</h2>
    <br/>
    <h3>Please specify your name here:</h3>
    <br/>
    <lay-input placeholder="Your name" v-model="name" :allow-clear="true"/>
    <br/>
    <br/>
    <lay-button type="primary" fluid @click="join">Join</lay-button>
  </lay-card>
</template>

<style scoped>
@media screen and (min-width: 620px) {
  .center-element {
    /* Center the content */
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30vh;
    width: var(--width);
    /* Offset the content */
    /* Convert the vh to vw*/
    --width: 50vh;
    margin-left: calc((100vw - var(--width)) * 0.5);
    margin-top: 35vh;
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

#theme-switch {
  font-size: x-large;
  font-weight: normal;
  display: flex;
  justify-content: flex-end;
}

</style>
