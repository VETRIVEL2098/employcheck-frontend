const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String },
    mobile: { type: String },
    status: { type: String, default: "Active" },
    emp_id: { type: String },
    last_active: { type: Date },
    createdAt: { type: Date },
    password: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccess" 
    }
  },
  { timestamps: true }
);
const userAccessSchema = new mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      name: { type: String, required: true },
      permissions: { type: Object, required: false },
    },
    { timestamps: true }
  );

const User = mongoose.model("User", userSchema);
const UserAccess = mongoose.model("UserAccess", userAccessSchema);
module.exports = {
    User,
    UserAccess
  };
  
