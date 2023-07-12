const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",                      //The ref option specifies the model to use for populating this field with the referenced document.
      required: true,
    },
  },
  {
    timestamps: true,       //optional argument
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
 