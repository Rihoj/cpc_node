import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config()
import addressRouter from "./routes/address";
import loginRouter from "./routes/login";

import models, {
  connectDb
} from "./models";

// eslint-disable-next-line
const createAddresses = async () => {
  const address1 = new models.Address( {
    name: "Test 1",
    lineOne: "1005 E Marie Ln",
    lineTwo: "",
    city: "Bloomington",
    state: "IN"
  } );
  await models.Address.countDocuments( {} ).then( ( count )=>{
    if( count < 5 ){
      address1.save();
    }
  } )
  .catch( ( err )=>{
    console.log( err );
  } )
};

var app = express();

app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( {
  extended: false
} ) );
app.use( cookieParser() );

app.use( ( req, res, next ) => {
  connectDb()
    .then( () => {
      createAddresses();
      next()
  } )
    .catch( ( err ) => {
      console.log( err );
      next( createError( 500 ) )
    } )
} );

app.use( "/address", addressRouter );
app.use( "/login", loginRouter );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  next( createError( 404 ) );
} );


// error handler
app.use( function( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( "env" ) === "development" ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.json( {
    "error": err.message
  } );
  next()
} );

export default app;
