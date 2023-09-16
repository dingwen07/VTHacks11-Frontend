<script setup>
import {ref} from 'vue'
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


</script>

<template>
    <LoginPage v-if="!user_id"/>
    <ChatroomList v-else />

</template>

<style scoped>
</style>
