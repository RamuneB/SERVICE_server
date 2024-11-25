import mongoose, { Document, Schema } from 'mongoose';

// Sukuriame interfeisą Business, kuris paveldi nuo Document, kad galėtume naudoti mongoose modelį
interface IBusiness extends Document {
  name: string;
  description?: string; // `description` yra neprivalomas
  address?: string; // `address` yra neprivalomas
  category: mongoose.Types.ObjectId; // `category` yra ObjectId ir nurodo Category modelį
  contactPerson?: string; // `contactPerson` yra neprivalomas
  email?: string; // `email` yra neprivalomas
  photos: string[]; // `photos` yra sąrašas string'ų
}

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  contactPerson: { type: String },
  email: { type: String },
  photos: [String],
});

// Sukuriame ir eksportuojame Business modelį
const Business = mongoose.model<IBusiness>('Business', businessSchema);

export default Business;
