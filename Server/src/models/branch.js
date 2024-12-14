import mongoose from "mongoose";

//Branch Schema

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },
  
  deliveryPatners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
    },
  ],
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
