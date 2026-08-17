import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  zone: { type: String }, // Populated server-side based on pincode
  phone: { type: String }
}, { _id: false });

const PreferencesSchema = new mongoose.Schema({
  language: { type: String, default: 'English (US)' },
  currency: { type: String, default: 'INR (₹)' },
  primaryCategory: { type: String, default: '' },
  preferredSize: { type: String, default: 'M' }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  phone: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please fill a valid 10-digit phone number']
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    default: 'Prefer not to say'
  },
  name: { 
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  avatarUrl: {
    type: String,
    trim: true,
    default: null
  },
  address: AddressSchema,
  preferences: {
    type: PreferencesSchema,
    default: () => ({})
  }
}, { 
  timestamps: true 
});

// In development, Next.js HMR can cache a stale model that lacks new fields.
// Deleting the cached model forces Mongoose to recompile with the latest schema.
if (process.env.NODE_ENV !== 'production' && mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
