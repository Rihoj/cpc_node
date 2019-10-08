import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lineOne: {
    type: String
  },
  lineTwo: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
