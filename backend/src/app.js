require('express-async-errors');
const Youch = require('youch');
const express = require('express');
const router = require('./routers');
const cors = require('cors');
require('./database/index.js');


class App {

    constructor(port){
        this.app = express();
        this.middleware();
        this.routers();
        this.errorHandler();
        this.app.listen(port);
    }   

    middleware(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routers(){
        this.app.use(router);
    }

    errorHandler() {
        // eslint-disable-next-line no-unused-vars
        this.app.use(async (err, req, res, next) => {
          const error = await new Youch(err, req).toJSON();
    
          return res.status(500).json({
            error,
          });
        });
      }

} 

module.exports = App;