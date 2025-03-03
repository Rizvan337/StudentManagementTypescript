import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  course: string;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true }
}, { timestamps: true });

export const Student = mongoose.model<IStudent>('Student', StudentSchema);
