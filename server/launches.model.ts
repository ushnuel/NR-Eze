import mongoose, { Document, Schema } from "mongoose";

export interface Launch extends Document {
  name: string;
  date_utc: string;
  flight_number: string;
}

const LaunchSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    flight_number: {
      unique: true,
      type: Number,
      required: true,
    },
    date_utc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LaunchModel = mongoose.model<Launch>("Launch", LaunchSchema);

export default LaunchModel;
