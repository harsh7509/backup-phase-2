import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// Ensure global cache is defined
global.mongoose = global.mongoose || { conn: null, promise: null };

const MONGO_URI = process.env.MONGO_URI || '';

export default async function dbConnect() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGO_URI).then((m) => m.connection);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
