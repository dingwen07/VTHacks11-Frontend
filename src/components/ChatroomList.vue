<script setup>
import {layer} from "@layui/layui-vue";
 import axios from 'axios'
 import {onUpdated, onMounted} from "vue"

 let $cookies = useCookies().cookies
 const root = "/api/v1"

 let chatrooms = ref([])

 function getChatRooms() {
     axios.get(root + '/user/' + $cookies.get("user_id") + '/chatroom').then(function (response) {
	 if (response.data.status === 0 || response.data.status === 200) {
	     chatrooms.value = response.data.data.chatroom
	 } else {
	     let $cookies = useCookies().cookies
	     $cookies.remove('user_id')
	     window.location.reload()
	 }
     })     

 }
 
 onUpdated(() => {
     getChatRooms()
 })

 onMounted(() => {
     getChatRooms()
 })

 const props = defineProps({
	 theme: String
     })

import {h, ref, resolveComponent} from 'vue'
import {useCookies} from "vue3-cookies";
import JoinOrCreateChatroom from "@/components/JoinOrCreateChatroom.vue";

const selectedKey = ref("1");
const changeSelectedKey = (val) => {
  selectedKey.value = val;
}
let collapse = ref(true)

function toggleCollapse() {
  collapse.value = !collapse.value
}

const create_or_join = () => {
  layer.open({
    type: "page",
    title: "Create/Join the Chat",
    content: h(JoinOrCreateChatroom, {user_id: $cookies.get("user_id")}),
  })
}



</script>

<template>
  <lay-menu id="menu" :selected-key="selectedKey" @change-selected-Key="changeSelectedKey" :tree="true"
            :collapse="collapse" theme="light">
    <lay-menu-item id="join" @click="create_or_join()">
      <template #icon>
        <lay-icon class="layui-icon-addition"></lay-icon>
      </template>
      <template #title>
        Create/Join the Chat
      </template>
    </lay-menu-item>
    <lay-menu-item v-for="chatroom in chatrooms" :key="chatroom.id" @click="$emit('enterRoom', chatroom.id)">
      <template #icon>
        <lay-icon class="layui-icon-group"></lay-icon>
      </template>
      <template #title>
        {{ chatroom.id }}
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
