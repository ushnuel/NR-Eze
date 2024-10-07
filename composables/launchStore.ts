import { defineStore } from "pinia";
import { toast } from "~/components/ui/toast";
import type { Launch } from "~/server/launches.model";

interface SpaceX {
  page: number;
  limit: number;
  docs: Launch[];
  offset: number;
  nextPage: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pagingCounter: number;
}

interface State {
  launches: Launch[];
  saved_launches: Launch[];
}

export interface ServerResponse {
  error: boolean;
  message: string;
}

export const useLaunchStore = defineStore("launch-store", {
  state: (): State => ({
    launches: [],
    saved_launches: [],
  }),
  actions: {
    async getLaunches() {
      await $fetch<SpaceX>("https://api.spacexdata.com/v4/launches/query", {
        method: "POST",
        body: {
          options: {
            sort: {
              date_utc: "desc",
            },
            select: {
              name: 1,
              date_utc: 1,
              flight_number: 1,
            },
            limit: 30,
          },
        },
      })
        .then((data) => {
          this.launches = data.docs;
          return data.docs;
        })
        .catch((e: Error) => {
          toast({
            description: "Error fetch launches",
            variant: "destructive",
          });
        });
    },
    // Get all saved launches from DB
    async getSaved() {
      await $fetch<Launch[]>("/api/launches")
        .then((data) => {
          this.saved_launches = data;
          return data;
        })
        .catch(() => {
          toast({
            description: "Error fetching saved launches",
            variant: "destructive",
          });
        });
    },

    async create(launch: Launch) {
      await $fetch<ServerResponse>("/api/launches/create", {
        method: "POST",
        body: launch,
      })
        .then(async (data) => {
          if (data.error) {
            toast({
              description: data.message,
              variant: "destructive",
            });
          } else {
            toast({
              description: data.message,
              variant: "success",
            });
            await this.getSaved();
          }
        })
        .catch(() => {
          toast({
            description: "Unable to save launch",
            variant: "destructive",
          });
        });
    },
    async remove(id: string) {
      await $fetch<ServerResponse>(`/api/launches/${id}`, {
        method: "DELETE",
      })
        .then(async (data) => {
          if (data.error) {
            toast({
              description: data.message,
              variant: "destructive",
            });
          } else {
            toast({
              description: data.message,
              variant: "success",
            });
            await this.getSaved();
          }
        })
        .catch((e: Error) => {
          toast({
            description: "Unable to delete launch",
            variant: "destructive",
          });
        });
    },
  },
});
