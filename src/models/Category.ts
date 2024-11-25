import mongoose, { Document, Schema } from 'mongoose';

// Sukuriame interfeisą Category, kuris paveldi nuo Document
interface ICategory extends Document {
  name: string;
  backgroundColor?: string; // `backgroundColor` yra neprivalomas
  iconUrl?: string; // `iconUrl` yra neprivalomas
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    backgroundColor: { type: String },
    iconUrl: { type: String },
  },
  { timestamps: true, versionKey: false },
);

// Sukuriame ir eksportuojame Category modelį
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
