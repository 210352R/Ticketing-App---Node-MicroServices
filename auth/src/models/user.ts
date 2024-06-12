import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
// User kenek hadanna one wena attributes tika
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Defines a Mongoose schema for the user with email and password fields.
// Both fields are required.

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// PRE SAVE HOOK
// Defines a pre-save middleware using userSchema.pre("save", ...) to
// hash the password before saving it to the database.

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHa