const session = require("express-session");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const User = require("./models/user");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODBURI =
  "mongodb+srv://christopher:cjambetsa@cluster0.gxedhff.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
app.locals.layout = false;

const store = new MongoDBStore(
  {
    url: MONGODBURI,
    collection: "sessions",
  },
  function (error) {
    if (error) {
      console.log(`MongoDBStore initialization error: ${error}`);
    } else {
      console.log('MongoDBStore initialized successfully.');
    }
  }
);

store.on("error", function (error) {
  console.log(error);
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("659d43009999bf75b6c7e9cb")
    .then((user) => {
      //Here
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODBURI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "test",
          email: "test@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
