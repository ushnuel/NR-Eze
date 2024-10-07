<template>
  <p v-if="status === 'pending'">Please wait...</p>
  <div v-else>
    <TableDetails :launches="launchStore.launches" />
  </div>
</template>

<script setup lang="ts">
import TableDetails from "~/components/TableDetails.vue";

const launchStore = useLaunchStore();

const { status } = await useAsyncData("launches", () =>
  launchStore.getLaunches()
);
</script>
