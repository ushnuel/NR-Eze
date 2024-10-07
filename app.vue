<template>
  <Toaster />
  <main>
    <AppHeader />
    <NuxtLoadingIndicator />
    <div class="mt-20 p-5 sm:px-10 min-h-screen">
      <AppNav class="flex sm:hidden mb-5" />
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
