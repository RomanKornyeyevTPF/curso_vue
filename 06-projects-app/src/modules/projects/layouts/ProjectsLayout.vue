<template>
  <div class="flex flex-col">
    <!-- Top menu -->
    <top-menu />

    <main class="flex flex-row">
      <!-- Side Menu -->
      <side-menu />

      <!-- Router View  -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
// import TopMenu from '../../common/components/TopMenu.vue'
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
