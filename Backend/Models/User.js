import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength:6
    },

    Exercises: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  },
  { timestamps: true }
);

const User= mongoose.model("User", UserSchema);
export default User;