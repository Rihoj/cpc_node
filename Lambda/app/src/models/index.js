import mongoose from "mongoose"

import Address from "./address"

const connectDb = () => {
  return mongoose.connect( ( process.env.DATABASE_URL ), { useNewUrlParser: true, useUnifiedTopology: true } );
};

const models = {
  Address
};

export {
  connectDb
}
export default models;
