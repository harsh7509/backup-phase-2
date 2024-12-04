import mongoose, { Schema, model, models } from 'mongoose';

const DealerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  requirements: [
    {
      cropName: String,
      budget: Number,
    },
  ],
});

export default models.Dealer || model('Dealer', DealerSchema);
