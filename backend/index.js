const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config(); 

const usersRoutes = require("./routes/users-routes");
const cartRoutes = require("./routes/cart-routes");
const storeRoutes = require("./routes/store-routes");
const ordersRoutes = require("./routes/orders-routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/store",storeRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",ordersRoutes);

app.use((req,res)=>{
  res.send("API not found");
});


mongoose
  .connect(
    process.env.MONGO_URL 
  )
  .then(() => {
    console.log("MongoDB Database connected Successfully.");
    app.listen(process.env.PORT,()=>{
        console.log(`Backend Running at ${process.env.PORT} port`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


