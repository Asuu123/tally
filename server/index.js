const express = require("express");
const next = require("next");
const routes = require("../routes");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
//const morgan =require("morgan")
const bodyParser =require("body-parser")
const cookieParser =require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const productRoutes = require('./routes/product')

const compression =require('compression');
const cors = require('cors');



//db
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})
.then(()=>console.log("DB Connected"));

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(compression());
  server.use(bodyParser.json());
    //MiddleWares
    //app.use(morgan('dev'))
    server.use(cookieParser())
   




    //routes
    server.use('/api',productRoutes);
 

      server.get("*", (req, res) => {
    // next.js is handling requests and providing pages where we are navigating to
    return handle(req, res);
  });

  // we are handling all of the request comming to our server


  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on port " + PORT);
  });
});
