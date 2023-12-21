const http = require("http"); // http modülü (server için)
const dotenv = require("dotenv"); // dotenv modülü (env dosyası için)
const mongoose = require("mongoose"); // mongoose modülü (mongodb için)
const path = require("path"); // path modülü (dosya yolu)
const cors = require("cors"); // cors modülü (cross origin resource sharing)

if (process.env.NODE_ENV === "production") {
  // production ortamı için env dosyası yolu ve adı belirleniyor (production ortamında env dosyası .env.production olmalı)
  dotenv.config({ path: path.join(__dirname, "config", ".env.production") }); // env dosyasının yolu ve adı
} else {
  dotenv.config({ path: path.join(__dirname, "config", ".env.development") }); // env dosyasının yolu ve adı
}

const app = require("./app"); // app.js dosyası
const server = http.createServer(app); // server oluşturuluyor

// CORS yapılandırması
app.use(cors());

const port = process.env.PORT || 5000; // port numarası
const version = process.env.NODE_ENV; // versiyon numarası
const mongo_uri = process.env.MONGO_URI; // mongodb uri

mongoose.set("strictQuery", true); // mongoose strictQuery true

mongoose.connect(mongo_uri, {}, (err) => {
  // mongodb bağlantısı yapılıyor
  if (err) throw err; // bağlantı hatası varsa hata fırlatılıyor
  server.listen(port, () =>
    // bağlantı başarılıysa server dinlemeye başlıyor
    console.log(`Api start on port: ${port} -- version: ${version}`)
  );
});
