<template>
  <div class="grid auto-fit-[250px] gap-3">
    <div v-for="launch in launchStore.saved_launches" :key="launch.id">
      <LaunchCard :launch="launch" />
    </div>
  </div>
  <div v-if="launchStore.saved_launches.length === 0">
    <p>No Saved Launches</p>
  </div>
</template>

<script setup lang="ts">
const launchStore = useLaunchStore();

await useAsyncData("launches", () => launchStore.getSaved());
</script>
