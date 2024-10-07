import { ServerResponse } from "~/composables/launchStore";
import LaunchModel from "~/server/launches.model";

export default defineEventHandler(async (event): Promise<ServerResponse> => {
  const id = event.context.params?.id;

  if (!id) {
    return { error: true, message: "Invalid launch id" };
  }

  try {
    await LaunchModel.findByIdAndDelete(id);
    return { error: false, message: "Launch deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, error: true };
    } else {
      return { message: "Error deleting launch", error: true };
    }
  }
});
