// tests/setup.ts

import { MongoMemoryServer } from "mongodb-memory-server-core"; // Use mongodb-memory-server-core
import mongoose from "mongoose";

import { app } from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf"; // Ensure you have a JWT key set up
  mongo = await MongoMemoryServer.create(); // This creates and starts the server
  const mongoUri = mongo.getUri(); // Get the URI after the server is started

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
