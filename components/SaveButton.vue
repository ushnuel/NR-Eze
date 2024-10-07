<template>
  <Button
    :size="'sm'"
    :disabled="loading"
    @click="saveLaunch(launch)"
    class="bg-emerald-600 hover:bg-emerald-800"
  >
    <span v-if="loading">Please wait...</span>
    <span v-else>Save Launch</span></Button
  >
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { Launch } from "~/server/launches.model";

interface Props {
  launch: Launch;
}

const props = defineProps<Props>();

const loading = ref(false);
const launchStore = useLaunchStore();

const saveLaunch = async (launch: Launch) => {
  loading.value = true;
  await launchStore.create(launch).finally(() => (loading.value = false));
};
</script>
