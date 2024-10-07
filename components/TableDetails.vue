<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px] md:w-[200px]">Flight Number</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Date</TableHead>
        <TableHead class="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="launch in launches" :key="launch.id">
        <TableCell class="font-medium">{{ launch.flight_number }}</TableCell>
        <TableCell> {{ launch.name }} </TableCell>
        <TableCell>{{
          dayjs(launch.date_utc).format("MMM DD, YYYY")
        }}</TableCell>
        <TableCell class="text-right">
          <SaveButton :launch="launch" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { Launch } from "~/server/launches.model";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

interface Props {
  launches: Launch[];
}

defineProps<Props>();
</script>
