// lambda.js
import "regenerator-runtime";
import awsServerlessExpress from "aws-serverless-express"
import app from "./index"
import {
  connectDb
} from "./models";


const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
  connectDb().then( async () => {
    awsServerlessExpress.proxy(server, event, context);
  }).catch((err) => {
    console.log(err);
    return err;
  });
}
