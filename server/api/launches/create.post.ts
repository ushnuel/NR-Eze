import { ServerResponse } from "~/composables/launchStore";
import LaunchModel, { Launch } from "~/server/launches.model";

export default defineEventHandler(async (event): Promise<ServerResponse> => {
  const body: Launch = await readBody(event);

  const launch = await LaunchModel.findOne({
    flight_number: body.flight_number,
  });

  if (launch !== null) {
    return { error: true, message: "Launch already saved" };
  }

  try {
    await LaunchModel.create(body);
    return { error: false, message: "Launch saved successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, error: true };
    } else {
      return { message: "Error saving launch", error: true };
    }
  }
});
