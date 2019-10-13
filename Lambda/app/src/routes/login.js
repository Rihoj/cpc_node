import express from "express";
var router = express.Router();
const AmazonCognitoIdentity = require( "amazon-cognito-identity-js" );
// const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
// const AWS = require( "aws-sdk" );
// const request = require( "request" );
// const jwkToPem = require( "jwk-to-pem" );
// const jwt = require( "jsonwebtoken" );
import dotenv from "dotenv";
dotenv.config()
global.fetch = require( "node-fetch" );
const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID
}
// console.log( process.env )
const userPool = new AmazonCognitoIdentity.CognitoUserPool( poolData );
var cognitoUser, sessionUserAttributes;

/* GET home page. */
router.get( "/", function( req, res, next ) {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails( {
    Username: req.body.username,
    Password: req.body.password,
  } );

  var userData = {
    Username: req.body.username,
    Pool: userPool
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser( userData );
  cognitoUser.authenticateUser( authenticationDetails, {
    onSuccess: function( result ) {
      var tokens = {
        accessToken: result.getAccessToken().getJwtToken(),
        idToken: result.getIdToken().getJwtToken(),
        refreshToken: result.getRefreshToken().getToken()
      }
      res.json( tokens )
    },
    newPasswordRequired: function( userAttributes ) {
      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.
      handleNewPassword( req.body.newPassword )
      // the api doesn't accept this field back
      delete userAttributes.email_verified;

      // store userAttributes on global variable
      sessionUserAttributes = userAttributes;
      res.json( "Password updated" )
    },
    onFailure: function( err ) {
      console.log( err );
      next( new Error( err.message ) )
    },

  } );
} );

function handleNewPassword( newPassword ) {
  cognitoUser.completeNewPasswordChallenge( newPassword, sessionUserAttributes );
}

export default router
