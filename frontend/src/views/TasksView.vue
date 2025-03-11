<template>
  <div class="layout flex min-h-screen">
    <Sidebar />

    <div class="content flex-1">
      <div class="container mx-auto">
        <Tasks />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Tasks from '../components/Tasks.vue'
  import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>
  .layout {
    min-height: 100vh;
  }
  .content {
    padding: 20px;
  }
</style>
