<script setup lang="ts">
import type { NuxtError } from "#app";
import { Button } from "./components/ui/button";

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl text-red-500">{{ error?.statusCode }} Error</h1>
    <h1>{{ error?.statusMessage }}</h1>
    <Button @click="handleError" :size="'lg'" :variant="'secondary'"
      >Refresh</Button
    >
  </div>
</template>
