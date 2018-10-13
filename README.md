# Udacity's Blockchain Project

This projects follows the [Udacity Blockchain Nanodegree](https://br.udacity.com/course/blockchain-developer-nanodegree--nd1309) program. 
Right now it contains the code for a very basic blockchain, and also explose a RESTfull service (in [express.js](http://expressjs.com)) that exposes some operations in this blockchain (see API below).

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes. 

### Installing

```
npm install
```

### Running the tests

```
npm run integration-test
npm run api-test
```

### Running the application
```
npm start
```
This should start a webserver listening the port 8000.

## Endpoints

### Block

#### [GET] Get a block from the blockchain by id
```
/block/:id
```
#### [POST] Post a message to the blockchain
```
/block/
```
###### Parameters
```
{
    "body": <The message to be saved in the blockchain>
}
```





