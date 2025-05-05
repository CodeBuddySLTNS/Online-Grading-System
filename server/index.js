const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => res.send("server online"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
