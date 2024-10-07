<template>
  <nav :class="cn('items-center space-x-4', props.class)">
    <template v-for="n in menu" :key="`menuItem${n.name}`">
      <NuxtLink
        active-class="text-primary"
        class="py-2 text-sm font-medium text-gray-500 transition-all rounded-lg link hover:text-primary hover:bg-primary-50"
        :to="n.link"
        >{{ n.name }}</NuxtLink
      >
    </template>
  </nav>
</template>

<script setup lang="ts">
import { cn } from "~/lib/utils";
const menu = ref([
  { name: "Launches", link: "/" },
  { name: "Saved Launches", link: "/saved-launches" },
]);

interface Props {
  class: string;
}

const props = defineProps<Props>();
</script>
