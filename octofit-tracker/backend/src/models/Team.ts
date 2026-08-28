import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    color: { type: String, required: true },
    motto: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);