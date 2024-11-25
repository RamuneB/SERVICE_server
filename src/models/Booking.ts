import mongoose, { Document, Schema } from 'mongoose';

// Sukuriame interfeisą Booking, kuris paveldi nuo Document, kad galėtume naudoti mongoose modelį
interface IBooking extends Document {
  businessId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  userEmail: string;
  userName?: string; // `userName` gali būti neprivalomas
  status?: string; // `status` gali būti neprivalomas
}

const bookingSchema = new Schema<IBooking>({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  date: { type: Date },
  time: { type: String },
  userEmail: { type: String, required: true },
  userName: { type: String },
  status: { type: String },
});

// Sukuriame ir eksportuojame Booking modelį
const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
