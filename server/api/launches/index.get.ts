import LaunchModel from "~/server/launches.model";

export default defineEventHandler(async (event) => {
  return await LaunchModel.find().sort({ date_utc: "desc" });
});
