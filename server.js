const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes");

const app = express();

app.set("view engine", "pug");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// DB Config
const url =
  "mongodb+srv://Terminal_Web:1asdfghjkl@cluster0.efntt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use("/", routes);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
