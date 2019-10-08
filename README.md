# CPC Node

This is my setup of using Lambda, User Pools, and Nodejs.

## To setup

```bash
cpc_node$ aws s3 mb s3://BUCKET_NAME
```

## To test SAM/Lambda

```bash
cpc_node$ cd Lambda/ && npm run test
```


## To run locally

```bash
cpc_node$ cd Lambda/app && npm run watch
```

## To deploy

```bash
cpc_node$ npm run sam
```
