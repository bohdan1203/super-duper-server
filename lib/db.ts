import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Use a cached connection to avoid creating multiple connections in dev (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | null;
}

let cached = global._mongooseConn ?? null;

export async function connectDB(
  databaseName: string,
): Promise<typeof mongoose> {
  if (cached) return cached;

  cached = mongoose.connect(MONGODB_URI.replace("DATABASE_NAME", databaseName));
  global._mongooseConn = cached;

  return cached;
}
