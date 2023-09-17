<script setup>
import {layer} from "@layui/layui-vue";
import axios from 'axios'

let $cookies = useCookies().cookies

let chatrooms = ref([])
axios.get('http://127.0.0.1:8080/user/'+ $cookies.get("user_id") +'/chatroom').then(function (response) {
  console.log(response.data.data.chatroom)
  chatrooms.value = response.data.data.chatroom
  console.log(chatrooms.value)
})

const props = defineProps({
  theme: String
})


const openLeftDrawer = function () {
  layer.drawer({
    title: "",
    content: "",
    area: ['80%', '100%'],
    offset: "l"
  })
}

import {ref} from 'vue'
import {useCookies} from "vue3-cookies";

const selectedKey = ref("1");
const changeSelectedKey = (val) => {
  selectedKey.value = val;
}
let collapse = ref(true)

function toggleCollapse() {
  collapse.value = !collapse.value
}


</script>

<template>
  <lay-menu id="menu" :selected-key="selectedKey" @change-selected-Key="changeSelectedKey" :tree="true"
            :collapse="collapse" theme="light">
    <lay-menu-item id="join">
      <template #icon>
        <lay-icon class="layui-icon-addition"></lay-icon>
      </template>
      <template #title>
        Create/Join the Chat
      </template>
    </lay-menu-item>
    <lay-menu-item v-for="chatroom in chatrooms" :key="chatroom.id">
      <template #icon>
        <lay-icon class="layui-icon-group"></lay-icon>
      </template>
      <template #title>
        {{ chatroom.name }}
      </template>
    </lay-menu-item>
    <div class="float_bottom">
      <lay-menu-item @click="$emit('themeToggled')">
        <template #icon>
          <lay-icon :class="props.theme === 'light' ? 'layui-icon-light' : 'layui-icon-moon'"></lay-icon>
        </template>
        <template #title>
          {{ theme === 'light' ? 'Light Mode' : 'Dark Mode' }}
        </template>
      </lay-menu-item>
      <lay-menu-item id="collapse" v-if="!collapse" @click="toggleCollapse()">
        <template #icon>
          <lay-icon class="layui-icon-prev"></lay-icon>
        </template>
        <template #title>
          Collapse
        </template>
      </lay-menu-item>
      <lay-menu-item id="expand" v-else @click="toggleCollapse()">
        <template #icon>
          <lay-icon class="layui-icon-next"></lay-icon>
        </template>
        <template #title>
          Expand
        </template>
      </lay-menu-item>
    </div>
  </lay-menu>
  <!--  <lay-button @click="openLeftDrawer" type="primary"><lay-icon class="layui-icon-group"/></lay-button>-->

</template>

<style scoped>
#menu {
  height: 100vh;
  position: relative;
}

body {
  color: white;
}
</style>
