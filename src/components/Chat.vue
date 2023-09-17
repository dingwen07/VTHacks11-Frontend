<script setup>
import {ref} from "vue";

const loading = ref(true);
</script>

<template>
  <lay-scroll thumbColor="#666" style="height: 90vh">
      <lay-skeleton :rows="30" :loading="loading" animated>
      </lay-skeleton>
  </lay-scroll>
  <lay-input fluid style="height: 10vh" placeholder="Enter Your Text Here">
    <template #append="{ disabled }"><lay-button type="primary" @click="loading = !loading">Toggle Loading</lay-button></template>
  </lay-input>
</template>

<style scoped>

</style>