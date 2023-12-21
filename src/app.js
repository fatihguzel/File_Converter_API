const express = require("express"); // express modülü (server için)
const cors = require("cors"); // cors modülü (cross origin resource sharing)
const app = express(); // express uygulaması
const session = require("express-session"); // express-session modülü (session için)
const MongoDBStore = require("connect-mongodb-session")(session); // connect-mongodb-session modülü (session için)
const bodyParser = require("body-parser"); // body-parser modülü (body için)
const fs = require("fs"); // fs modülü (dosya işlemleri için)
const path = require("path"); // path modülü (dosya yolu)
const { indexRouter } = require("./routers/index.router"); // index router

const mongo_uri = process.env.MONGO_URI; // mongodb uri

const store = new MongoDBStore({
  // session için mongodb store
  uri: mongo_uri, // mongodb uri
  collection: "sessions", // collection adı
});

app.use(
  // CORS yapılandırması
  cors({
    // cors modülü (cross origin resource sharing)
    origin: ["http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

const sessionMiddleware = session({
  // session için middleware
  secret: fs
    .readFileSync(path.join(__dirname, "config", "SecretKey.txt"))
    .toString(),
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 gün
  },
});

app.use(sessionMiddleware); // session middleware
app.use(express.static(path.join(__dirname, "public"))); // public klasörü

app.use(bodyParser.json()); // body-parser modülü (body için)
app.use(bodyParser.urlencoded({ extended: true })); // body-parser modülü (body için)

app.use("/", indexRouter); // index router

module.exports = app; // app.js dosyası
module.exports.sessionMiddleware = sessionMiddleware; // session middleware
