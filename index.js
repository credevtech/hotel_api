const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

// const bcrypt = require("bcrypt");

const clients = require("./routers/clients.router");
const rooms = require("./routers/rooms.router");
const bookings = require("./routers/bookings.router");

const homeRouter = require("./routers/home.router");
const login = require("./routers/login.router");
const auth = require("./routers/auth.router");

const users = require("./routers/users.router");
const checkToken = require("./middleware").checkToken;

const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "user",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1,
    },
  })
);

app.use(express.json());
app.use("/v1/auth", auth);
app.use("/v1/login", checkToken);

app.use("/v1", login);
app.use("/v1", homeRouter);
app.use("/v1", checkToken);
app.use("/v1", clients);
app.use("/v1", bookings);
app.use("/v1", rooms);

app.use("/v1", users);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
