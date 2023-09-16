<script setup>
import {ref, onMounted} from 'vue'
import { useCookies } from 'vue3-cookies'
import ChatroomList from "@/components/ChatroomList.vue";
import LoginPage from "@/components/LoginPage.vue";
import axios from "axios";

let $cookies = useCookies().cookies
let user_id = ref($cookies.isKey("user_id"))

if (user_id.value) {
  axios.get("http://127.0.0.1:5678/api/v1/user/").then(function (response) {
        if (response.data.status !== 0) {
          user_id.value = false
          console.log("Cannot find the user!")
          $cookies.remove('user_id')
        }
      }
  )
}

const userTheme = ref("light")
</script>

<template>
  <lay-config-provider :theme="userTheme">
    <LoginPage v-if="!user_id"/>
    <ChatroomList @theme-toggled="() => userTheme = userTheme === 'light' ? 'dark' : 'light'" v-else />
  </lay-config-provider>
</template>

<style scoped>
</style>
