// app server instance is created in index.js
const express = require("express");
const app = express();
const cors = require("cors");
// what is cors?
// cors is used for entertain frontend and backend on different ports
const database = require("./config/database");
const { cloudnairyConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profileroute");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 5000;

// database se connect kro
database.dBconnect();
// miidleware add kro
app.use(express.json());

app.use(cookieParser());

// jo frontend se request arhi usko entertain kro
// locahost:3000 se request arhi hai
// agr yh nhi likha toh cors error ayega
// fir entertain bhi nhi kr paege hm
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/jiyan/",
  })
);
// cloudinary se connect kro
cloudnairyConnect();

// routes ko use kro
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from server",
  });
});
