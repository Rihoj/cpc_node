import express from "express";
import models from "../models"
import authenticate from "../auth/authenticate"

var router = express.Router();

router.use( authenticate );
/* GET address listing. */
router.get( "/", function( req, res, next ) {
  models.Address.find( {} )
    .then( ( address ) => {
      res.json( address )
    } )
    .catch( ( err ) => {
      let error = new Error( err )
      next( error )
    } );
} );

/* GET address listing. */
router.get( "/:id", function( req, res, next ) {

  models.Address.findById( req.params.id )
    .then( ( address ) => {
      if ( address === null ) {
        let error = new Error( "Could not find address " + req.params.id )
        next( error )
      }
      res.json( address )
    } )
    .catch( ( err ) => {
      let error = new Error( err )
      next( error )
    } );
} );

router.post( "/", function( req, res, next ) {
  models.Address.create( res.body ).then( ( addresses ) => {
      res.json( addresses );
    } )
    .catch( ( err ) => {
      let error = new Error( err )
      next( error )
    } );
} );

router.put( "/:id", function( req, res, next ) {
  models.Address.updateOne( {
      "_id": req.params.id
    }, req.body )
    .then( ( result ) => {
      if ( result.n < 1 ) {
        let error = new Error( "Could not find address " + req.params.id );
        next( error )
      } else
      if ( result.nModified < 1 ) {
        let error = new Error( "Could not update address " + req.params.id )
        next( error )
      } else {
        models.Address.findById( req.params.id )
          .then( ( address ) => {
            res.json( address )
          } )
          .catch( ( err ) => {
            let error = new Error( err );
            next( error )
          } );
      }
    } )
    .catch( ( err ) => {
      let error = new Error( err )
      next( error )
    } );
} );

router.delete( "/:id", function( req, res, next ) {
  models.Address.deleteOne( {
      "_id": req.params.id
    } )
    .then( () => {
      res.json( {
        message: req.params.id + " has been deleted"
      } )
    } )
    .catch( ( err ) => {
      let error = new Error( err )
      next( error )
    } )
} )

export default router
