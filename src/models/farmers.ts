import mongoose, { Schema, model, models } from 'mongoose';

const FarmerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  crops: [
    {
      name: String,
      price: Number,
    },
  ],
});

export default models.Farmer || model('Farmer', FarmerSchema);
