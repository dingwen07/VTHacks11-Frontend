<script setup>
import {ref, onMounted} from 'vue'
import {useCookies} from 'vue3-cookies'
import ChatroomList from "@/components/ChatroomList.vue"
import LoginPage from "@/components/LoginPage.vue"
import axios from "axios"
import Chat from "@/components/Chat.vue"
import EmptyPage from "@/components/EmptyPage.vue"

let $cookies = useCookies().cookies
let user_id = ref($cookies.isKey("user_id"))
let user_name = ref(null)
if (user_id.value) {
     axios.get("http://172.29.146.39:8080/user/" + $cookies.get("user_id")).then(function (response) {
         if (response.data.status !== 0 && response.data.status !== 200) {
          user_id.value = false
          console.log("Cannot find the user!")
          $cookies.remove('user_id')
        } else {
          user_name.value = response.data.data.name
        }
      }
  )
}

 const chatrooms = ref([])
 axios.get('http://172.29.146.39:8080/user/' + $cookies.get("user_id") + '/chatroom').then(function (response) {
     chatrooms.value = response.data.data.chatroom
 })

const chat_room_id = ref(null)

const userTheme = ref("light")

</script>

<template>
  <lay-config-provider :theme="userTheme">
    <lay-layout v-if="user_id">
      <ChatroomList @enter-room="(room_id) => chat_room_id = room_id"
                    @theme-toggled="userTheme = userTheme === 'light' ? 'dark' : 'light'" :theme="userTheme"/>
      <Chat @theme-toggled="userTheme = userTheme === 'light' ? 'dark' : 'light'" :theme="userTheme"
            :user_id="$cookies.get('user_id')" :chatroom_id="chat_room_id" v-if="chat_room_id != null"/>
      <lay-body fluid v-if="chat_room_id === null">
        <EmptyPage @theme-toggled="userTheme = userTheme === 'light' ? 'dark' : 'light'" :theme="userTheme"
                   :user_id="$cookies.get('user_id')" :user_name="user_name"/>
      </lay-body>
    </lay-layout>

    <LoginPage @theme-toggled="userTheme = userTheme === 'light' ? 'dark' : 'light'" v-else
               :theme="userTheme"/>
  </lay-config-provider>
</template>

<style scoped>
</style>
