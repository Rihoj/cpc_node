// lambda.js
import awsServerlessExpress from "aws-serverless-express"
import app from "./index"
import {
  connectDb
} from "./models";

connectDb().then(async () => {
  const server = awsServerlessExpress.createServer(app)
  exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
  }
});
