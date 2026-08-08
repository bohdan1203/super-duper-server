import mongoose, { Model, Schema } from "mongoose";

interface IPullUp {
  reps: number;
  dateTime: Date;
}

const pullUpSchema = new Schema<IPullUp>(
  {
    reps: { type: Number, required: true },
    dateTime: { type: Date, required: true },
  },
  { timestamps: true },
);

export const PullUp: Model<IPullUp> =
  mongoose.models.PullUp ?? mongoose.model<IPullUp>("PullUp", pullUpSchema);
