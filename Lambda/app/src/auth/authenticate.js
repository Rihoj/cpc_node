import CognitoExpress from "cognito-express"
import dotenv from "dotenv"
dotenv.config();

const cognitoExpress = new CognitoExpress( {
  region: "us-east-2",
  cognitoUserPoolId: process.env.USER_POOL_ID,
  tokenUse: "access", //Possible Values: access | id
  tokenExpiration: 3600000
} )
const authenticate = ( req, res, next ) => {
  let accessTokenFromClient = req.headers.accesstoken;

  //Fail if token not present in header.
  if ( !accessTokenFromClient ) return res.status( 401 ).json( "Access Token missing from header" );

  cognitoExpress.validate( accessTokenFromClient, function( err, response ) {

    //If API is not authenticated, Return 401 with error message.
    if ( err ) return res.status( 401 ).send( err );

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    console.log( res.locals.user );
    next();
  } );
}

export default authenticate
