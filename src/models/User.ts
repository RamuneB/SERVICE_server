import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Vartotojo schema
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  isCorrectPassword(password: string): Promise<boolean>; // Pridėtas metodas isCorrectPassword
}

// Sukuriame vartotojo schema
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Patikrinimas, ar el. paštas teisingas
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'], // Slaptažodžio ilgis
  },
});

// Pridedame metodą slaptažodžio patikrinimui
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

// Naujas metodas, kuris tikrina slaptažodį (naudojame comparePassword)
userSchema.methods.isCorrectPassword = function (password: string): Promise<boolean> {
  return this.comparePassword(password); // Galime tiesiog naudoti jau sukurtą comparePassword metodą
};

// Sukuriame ir eksportuojame User modelį
const User = mongoose.model<IUser>('User', userSchema);
export default User;
