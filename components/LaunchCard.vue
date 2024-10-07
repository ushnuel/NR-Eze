<template>
  <Card class="max-w-[600px]">
    <CardContent class="space-y-3 p-4">
      <h1 class="font-semibold">{{ launch.name }}</h1>
      <div class="flex justify-between items-center">
        <div>
          <p>Flight Number</p>
          {{ launch.flight_number }}
        </div>
        <div>
          <p>Launch Date</p>
          {{ dayjs(launch.date_utc).format("MMM DD, YYYY") }}
        </div>
      </div>
      <Button
        :size="'sm'"
        :disabled="loading"
        :variant="'destructive'"
        @click="remove(launch._id as string)"
      >
        <span v-if="loading">Please wait...</span>
        <span v-else>Delete Launch</span>
      </Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import type { Launch } from "~/server/launches.model";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  launch: Launch;
}

defineProps<Props>();

const loading = ref(false);
const launchStore = useLaunchStore();

const remove = async (id: string) => {
  loading.value = true; // Set loading to true
  await launchStore.remove(id).finally(() => (loading.value = false));
};
</script>
